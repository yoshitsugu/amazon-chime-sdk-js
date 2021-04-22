// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as chai from 'chai';
import { expect } from 'chai';

import VideoPreference from '../../src/videodownlinkbandwidthpolicy/VideoPreference';
import { VideoPreferences } from '../../src/videodownlinkbandwidthpolicy/VideoPreferences';

describe('VideoPreferences', () => {
  const expect: Chai.ExpectStatic = chai.expect;

  it('can be defaulted', () => {
    const d = VideoPreferences.default();
    expect(d.isEmpty()).to.be.true;
  });

  it('can be built', () => {
    const p = VideoPreferences.prepare().build();
    expect(p.isEmpty()).to.be.true;
  });

  it('is equal to empty', () => {
    const d = VideoPreferences.default();
    const p = VideoPreferences.prepare().build();
    expect(p.isEmpty()).to.be.true;
    expect(p.equals(d)).to.be.true;
  });

  it('can be populated', () => {
    const b = VideoPreferences.prepare();
    b.add(new VideoPreference('foo', 1));
    const p = b.build();
    has(p, 'foo');
    expect(p.isEmpty()).to.be.false;
  });

  it('can be modified', () => {
    const b = VideoPreferences.prepare();
    b.add(new VideoPreference('foo', 1));
    const p1 = b.build();

    b.add(new VideoPreference('bar', 2));
    const p2 = b.build();

    has(p1, 'foo');
    has(p2, 'foo');
    has(p2, 'bar');
    not(p1, 'bar');

    expect(p1.equals(p2)).to.be.false;

    const b2 = p1.modify();
    b2.add(new VideoPreference('bar', 2));
    const p3 = b2.build();

    expect(p1.equals(p2)).to.be.false;
    expect(p1.equals(p3)).to.be.false;
    expect(p3.equals(p2)).to.be.true;
  });
});

function has(prefs: VideoPreferences, id: string): void {
  expect(prefs.some(pref => pref.attendeeId === id)).to.be.true;
}

function not(prefs: VideoPreferences, id: string): void {
  expect(prefs.some(pref => pref.attendeeId === id)).to.be.false;
}
