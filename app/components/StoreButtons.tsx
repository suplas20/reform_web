import { DownloadButton } from "./DownloadButton";

export function StoreButtons() {
  return (
    <div className="hero-stores" aria-label="앱 다운로드">
      <DownloadButton
        className="store-badge"
        aria-label="App Store 다운로드 - 출시 준비 중"
      >
        <span className="store-symbol" aria-hidden="true">
          ●
        </span>
        <span>
          <small>iPhone 앱</small>
          <strong>App Store</strong>
        </span>
      </DownloadButton>
      <DownloadButton
        className="store-badge"
        aria-label="Google Play 다운로드 - 출시 준비 중"
      >
        <span className="play-icon" aria-hidden="true" />
        <span>
          <small>Android 앱</small>
          <strong>Google Play</strong>
        </span>
      </DownloadButton>
    </div>
  );
}
