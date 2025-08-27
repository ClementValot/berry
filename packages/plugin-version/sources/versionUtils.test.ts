import * as versionUtils from './versionUtils';

describe(`versionUtils`, () => {
  describe(`applyPrerelease`, () => {
    it(`should add the given prerelease pattern when needed`, () => {
      expect(versionUtils.applyPrerelease(`1.2.3`, {current: `1.2.3`, prerelease: `rc.%n`})).toEqual(`1.2.3-rc.1`);
    });

    it(`should bump the prerelease number if there's already one`, () => {
      expect(versionUtils.applyPrerelease(`1.2.3`, {current: `1.2.3-rc.41`, prerelease: `rc.%n`})).toEqual(`1.2.3-rc.42`);
    });

    it(`should reset the prerelease number when the version would change`, () => {
      expect(versionUtils.applyPrerelease(`1.3.0`, {current: `1.2.3-rc.41`, prerelease: `rc.%n`})).toEqual(`1.3.0-rc.1`);
    });
  });

  describe(`applyStrategy`, () => {
    it(`should increase the prerelease number with prerelease strategy`, () => {
      expect(versionUtils.applyStrategy(`1.2.3-0`, `prerelease`)).toEqual(`1.2.3-1`);
    });

    it(`should apply prepatch, preminor, premajor strategies`, () => {
      expect(versionUtils.applyStrategy(`1.2.3`, `prepatch`)).toEqual(`1.2.4-0`);
      expect(versionUtils.applyStrategy(`1.2.3`, `preminor`)).toEqual(`1.3.0-0`);
      expect(versionUtils.applyStrategy(`1.2.3`, `premajor`)).toEqual(`2.0.0-0`);
    });

    it(`should apply prerelease with a prerelease id`, () => {
      expect(versionUtils.applyStrategy(`0.5.5`, `prerelease`, `beta`)).toEqual(`0.5.6-beta.0`);
      expect(versionUtils.applyStrategy(`12.12.12-beta.6`, `prerelease`, `beta`)).toEqual(`12.12.12-beta.7`);
      expect(versionUtils.applyStrategy(`1.2.3-beta.2`, `prerelease`, `alpha`)).toEqual(`1.2.3-alpha.0`);
    });
  });
});
