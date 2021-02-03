// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import ClientMetricReport from '../clientmetricreport/DefaultClientMetricReport';
import Logger from '../logger/Logger';
import VideoStreamIdSet from '../videostreamidset/VideoStreamIdSet';
import VideoStreamIndex from '../videostreamindex/VideoStreamIndex';
import VideoAdaptivePolicy from './VideoAdaptivePolicy';
import VideoDownlinkObserver from './VideoDownlinkObserver';
import VideoPreference from './VideoPreference';

export default class VideoPriorityBasedPolicy extends VideoAdaptivePolicy {
  constructor(protected logger: Logger) {
    super(logger);
    this.videoPreferences = [];
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

  chooseRemoteVideoSources(preferences: VideoPreference[]): void {
    if (this.arePreferencesDifferent(preferences)) {
      this.videoPreferences = preferences;
      this.videoPreferencesUpdated = true;
      this.logger.info(
        `bwe: chooseRemoteVideoSources bwe: new preferences: ${JSON.stringify(
          this.videoPreferences
        )}`
      );
      if (this.wantsResubscribe()) {
        this.logger.info(`bwe: videoPriorityBasedPolicy wants a resubscribe`);
        this.forEachObserver(observer => {
          observer.shouldResubscribeRemoteVideos();
        });
      }
    } else {
      return;
    }
  }

  private arePreferencesDifferent(preferences: VideoPreference[]): boolean {
    if (preferences.length !== this.videoPreferences.length) {
      return true;
    }

    for (const preference of preferences) {
      if (
        this.videoPreferences.findIndex(
          videoPreference =>
            videoPreference.attendeeId === preference.attendeeId &&
            videoPreference.priority === preference.priority &&
            videoPreference.targetSize === preference.targetSize
        ) === -1
      ) {
        return true;
      }
    }
    return false;
  }
}
