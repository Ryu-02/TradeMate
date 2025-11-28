import type { Trade } from "../types/trade";

interface TradeListProps {
  trades: Trade[];
  onEdit: (trade: Trade) => void;
  onDelete: (id: number) => void;
}

export function TradeList({ trades, onEdit, onDelete }: TradeListProps) {
  if (trades.length === 0) {
    return <p className="empty-text">등록된 매매 내역이 없습니다.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>날짜</th>
          <th>유형</th>
          <th>종목</th>
          <th>수량</th>
          <th>가격</th>
          <th>수수료</th>
          <th>메모</th>
          <th>액션</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade) => (
          <tr key={trade.id}>
            <td>{new Date(trade.date).toLocaleDateString()}</td>
            <td>{trade.type === "BUY" ? "매수" : "매도"}</td>
            <td>{trade.symbol}</td>
            <td>{trade.quantity}</td>
            <td>{trade.price}</td>
            <td>{trade.fee}</td>
            <td>{trade.memo}</td>
            <td>
              <div className="trade-actions">
                <button type="button" className="table-action-button" onClick={() => onEdit(trade)}>
                  수정
                </button>
                <button
                  type="button"
                  className="table-action-button table-action-button--danger"
                  onClick={() => onDelete(trade.id)}
                >
                  삭제
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
