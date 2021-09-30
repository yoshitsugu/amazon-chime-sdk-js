// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export default class TranscriptEntity {
  category: string;
  confidence: number;
  content: string;
  endTime: number;
  startTime: number;
  type?: string;
}
