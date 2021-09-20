// SPDX-License-Identifier: Apache-2.0

/**
 * [[VideoElement]] encapsulates the HTMLVideoElement in [[VideoTileState]]
 */
export default class VideoElement {
  /**
   * The Id of the bound HTMLVideoElement.
   */
  id: string | null = null;

  /**
   * The HTMLVideoElement bound with the [[VideoTile]].
   */
  boundVideoElement: HTMLVideoElement | null = null;

  /**
   * The CSS height in pixel of the HTMLVideoElement upon binding with the [[VideoTile]].
   */
  videoElementCSSHeightPixels: number | null = null;

  /**
   * The CSS width in pixel of the HTMLVideoElement upon binding with the [[VideoTile]].
   */
  videoElementCSSWidthPixels: number | null = null;

  /**
   * The physical height in pixel of the HTMLVideoElement upon binding with the [[VideoTile]].
   */
  videoElementPhysicalHeightPixels: number | null = null;

  /**
   * The physical width in pixel of the HTMLVideoElement upon binding with the [[VideoTile]].
   */
  videoElementPhysicalWidthPixels: number | null = null;
}
