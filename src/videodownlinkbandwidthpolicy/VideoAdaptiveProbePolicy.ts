// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import ClientMetricReport from '../clientmetricreport/DefaultClientMetricReport';
import ContentShareConstants from '../contentsharecontroller/ContentShareConstants';
import VideoStreamIdSet from '../videostreamidset/VideoStreamIdSet';
import VideoStreamDescription from '../videostreamindex/VideoStreamDescription';
import VideoStreamIndex from '../videostreamindex/VideoStreamIndex';
import VideoAdaptivePolicy from './VideoAdaptivePolicy';
import VideoDownlinkObserver from './VideoDownlinkObserver';
import VideoPreference from './VideoPreference';

export default class VideoAdaptiveProbePolicy extends VideoAdaptivePolicy {
  // This class contains pass through methods to the parent class so that we can
  // mark it as internal while still having this class implement VideoDownlinkBandwidthPolicy

  reset(): void {
    super.reset();
  }

  updateIndex(videoIndex: VideoStreamIndex): void {
    super.updateIndex(videoIndex);

    const preferences: VideoPreference[] = [];
    let containsContent = false;
    const remoteInfos: VideoStreamDescription[] = videoIndex.remoteStreamDescriptions();
    // If there is active content then set that as high priority, and the rest at lower
    for (const info of remoteInfos) {
      if (preferences.findIndex(preference => preference.attendeeId === info.attendeeId) === -1) {
        // For now always subscribe to content even if higher bandwidth then target
        if (info.attendeeId.endsWith(ContentShareConstants.Modality)) {
          preferences.push(new VideoPreference(info.attendeeId, 1));
          containsContent = true;
        } else {
          preferences.push(new VideoPreference(info.attendeeId, 2));
        }
      }
    }
    if (containsContent) {
      this.videoPreferences = preferences;
      this.videoPreferencesUpdated = true;
    } else {
      this.videoPreferences = undefined;
    }
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
}
