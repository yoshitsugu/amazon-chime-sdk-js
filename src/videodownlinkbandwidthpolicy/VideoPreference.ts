// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import TargetDisplaySize from './TargetDisplaySize';

export default class VideoPreference {
  /**
   * The attendee ID this preference relates to.
   */
  attendeeId: string;

  /**
   * The relative priority of this attendee against others.
   */
  priority: number;

  /**
   * The desired maximum simulcast layers to receive.
   */
  targetSize: TargetDisplaySize;

  constructor(attendeeId: string, priority: number, targetSize?: TargetDisplaySize) {
    this.attendeeId = attendeeId;
    this.priority = priority;
    this.targetSize = targetSize !== undefined ? targetSize : TargetDisplaySize.High;
  }

  private static readonly LOW_BITRATE_KBPS = 300;
  private static readonly MID_BITRATE_KBPS = 600;
  private static readonly HIGH_BITRATE_KBPS = 1200;

  targetSizeToBitrateKbps(targetSize: TargetDisplaySize): number {
    switch (targetSize) {
      case TargetDisplaySize.High:
        return VideoPreference.HIGH_BITRATE_KBPS;
      case TargetDisplaySize.Medium:
        return VideoPreference.MID_BITRATE_KBPS;
      case TargetDisplaySize.Low:
        return VideoPreference.LOW_BITRATE_KBPS;
    }
  }
}
