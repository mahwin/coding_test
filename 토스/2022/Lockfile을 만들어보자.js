//정답 코드
async function solution(packageJson, fetchVersions, fetchPackageJson) {
  const versions = {};
  //재귀적으로 버전 의존성을 체크함.
  await resolveVersion(packageJson);

  return flattenVersions(versions);

  async function resolveVersion(packageJson) {
    const packagesToDownload = Object.entries(packageJson.dependencies);
    for (const [packageName, rawSemver] of packagesToDownload) {
      if (!(packageName in versions)) {
        versions[packageName] = {
          matched: new Map(),
          availables: await fetchVersions(packageName).then(sort),
        };
      }
      const { matched, availables } = versions[packageName];
      if (matched.has(rawSemver)) {
        // 무한 루프에 빠지지 않게 체크했었다면 continue;
        continue;
      }
      // 스택틱 이용해서 new keyword로 객체 생성하지 않고 메소드 사용
      const semver = NodeSemver.of(rawSemver);
      const highestPossibleVersion = availables.find((candidate) =>
        semver.canAccept(candidate)
      );
      matched.set(rawSemver, highestPossibleVersion);
      const nextPackageJson = await fetchPackageJson(
        packageName,
        highestPossibleVersion
      );
      await resolveVersion(nextPackageJson);
    }
  }
}

function flattenVersions(versions) {
  const packageNames = Object.keys(versions);
  const lockFile = [];
  for (const packageName of packageNames) {
    const { matched } = versions[packageName];
    const versionCandidates = Array.from(new Set(matched.values()));
    lockFile.push(
      ...versionCandidates.map((version) => `${packageName}@${version}`)
    );
  }
  return lockFile;
}

function sort(rawVersions) {
  return rawVersions
    .map((version) => NodeSemver.of(version))
    .sort(NodeSemver.sort)
    .map((nodeSemver) => nodeSemver.version);
}

class NodeSemver {
  constructor(version, type, major, minor, patch) {
    this.version = version;
    this.type = type;
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }

  static sort(s1, s2) {
    if (s1.major > s2.major) return -1;
    if (s1.major === s2.major) {
      if (s1.minor > s2.minor) return -1;
      if (s1.minor === s2.minor) {
        return s1.patch >= s2.patch ? -1 : 1;
      }
      return 1;
    }
    return 1;
  }

  static of(rawSemver) {
    if (rawSemver === "*") {
      return new NodeSemver(rawSemver, "all", null, null, null);
    }

    let type, version;

    if (rawSemver.startsWith("^")) {
      version = rawSemver.slice(1);
      type = "major";
    } else if (rawSemver.startsWith("~")) {
      version = rawSemver.slice(1);
      type = "minor";
    } else {
      version = rawSemver;
      type = "exact";
    }

    const [major, minor, patch] = version
      .split(".")
      .map((digit) => parseInt(digit));
    return new NodeSemver(version, type, major, minor, patch);
  }

  canAccept(exactVersion) {
    const target = NodeSemver.of(exactVersion);
    if (target.type !== "exact") {
      throw new Error(
        `Cannot calculate acceptability with version: ${exactVersion}`
      );
    }

    switch (this.type) {
      case "all":
        return true;
      case "exact":
        return exactVersion === this.version;
      case "major":
        // major는 같아야 하고
        return target.major === this.major &&
          // minor가 같은 경우 patch를 비교
          target.minor === this.minor
          ? target.patch >= this.patch
          : target.minor > this.minor;
      case "minor":
        return (
          target.major === this.major &&
          target.minor === this.minor &&
          target.patch >= this.patch
        );
    }
    return false;
  }
}

module.exports.solution = solution;

`
static of  => ClassName.of
static sort => ClassName.sort

특정 메서드가 특정 데이터를 위해서만 존재한다면 class 내부에 static 키워드를 통해 new 키워드 없이 사용할 수 있게 만듬
타 데이터도 객체 안에서 특정한 이름을 갖도록 설계한 점이 배울게 많았음!!

일주일 뒤에 혼자 다시 짜볼예정
`;
