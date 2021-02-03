// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export default interface VideoDownlinkObserver {
  /**
   * Called when the downlink policy wants to change the remote videos being received
   */
  shouldResubscribeRemoteVideos(): void;

  /**
   * Called when the downlink policy wants to pause the remote video tile due to bandwidth estimation
   */
  tileWillBePausedByDownlinkPolicy(tileId: number): void;

  /**
   * Called when the downlink policy wants to unpause the remote video tile due to bandwidth estimation
   */
  tileWillBeUnpausedByDownlinkPolicy(tileId: number): void;
}
