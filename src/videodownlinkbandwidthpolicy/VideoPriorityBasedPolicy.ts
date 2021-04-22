// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import ClientMetricReport from '../clientmetricreport/DefaultClientMetricReport';
import Logger from '../logger/Logger';
import VideoStreamIdSet from '../videostreamidset/VideoStreamIdSet';
import VideoStreamIndex from '../videostreamindex/VideoStreamIndex';
import VideoAdaptivePolicy from './VideoAdaptivePolicy';
import VideoDownlinkObserver from './VideoDownlinkObserver';
import { VideoPreferences } from './VideoPreferences';

export default class VideoPriorityBasedPolicy extends VideoAdaptivePolicy {
  constructor(protected logger: Logger) {
    super(logger);
    this.videoPreferences = VideoPreferences.default();
    this.pauseTiles = true;
  }

  // This class contains pass through methods to the parent class so that we can
  // mark it as internal while still having this class implement VideoDownlinkBandwidthPolicy

  reset(): void {
    super.reset();
    this.pauseTiles = true;
  }

  updateIndex(videoIndex: VideoStreamIndex): void {
    super.updateIndex(videoIndex);
  }

  updateMetrics(clientMetricReport: ClientMetricReport): void {
    super.updateMetrics(clientMetricReport);
  }

  wantsResubscribe(): boolean {
    return super.wantsResubscribe();
  }

  chooseSubscriptions(): VideoStreamIdSet {
    return super.chooseSubscriptions();
  }

  addObserver(observer: VideoDownlinkObserver): void {
    super.addObserver(observer);
  }

  removeObserver(observer: VideoDownlinkObserver): void {
    super.removeObserver(observer);
  }

  chooseRemoteVideoSources(preferences: VideoPreferences): void {
    if (this.videoPreferences.equals(preferences)) {
      return;
    }
    this.videoPreferences = preferences;
    this.videoPreferencesUpdated = true;
    this.logger.info(
      `bwe: chooseRemoteVideoSources bwe: new preferences: ${JSON.stringify(this.videoPreferences)}`
    );
    if (this.wantsResubscribe()) {
      this.logger.info(`bwe: videoPriorityBasedPolicy wants a resubscribe`);
      this.forEachObserver(observer => {
        observer.shouldResubscribeRemoteVideos();
      });
    }
  }
}
