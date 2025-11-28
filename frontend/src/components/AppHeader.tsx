export function AppHeader() {
  return (
    <header className="app-header">
      <span className="app-icon" aria-hidden="true">
        📒
      </span>
      <div>
        <h1 className="app-title">매매 기록</h1>
        <p className="app-subtitle">
          오늘 매매한 내역을 간단하게 기록해 두고, 나중에 다시 볼 수 있게 정리해 보는 용도예요.
        </p>
      </div>
    </header>
  );
}
