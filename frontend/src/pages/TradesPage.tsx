import { useEffect, useState } from "react";
import { fetchTrades, createTrade, updateTrade, deleteTrade } from "../api/trades";
import type { Trade } from "../types/trade";
import { TradeForm, type TradeFormValues } from "../components/TradeForm";
import { TradeList } from "../components/TradeList";
import { AppHeader } from "../components/AppHeader";
import { Modal } from "../components/Modal";
import { FloatingAddButton } from "../components/FloatingAddButton";

function mapTradeToFormValues(trade: Trade): TradeFormValues {
  return {
    date: new Date(trade.date).toISOString().slice(0, 10),
    type: trade.type as "BUY" | "SELL",
    symbol: trade.symbol,
    name: trade.name ?? "",
    quantity: trade.quantity,
    price: Number(trade.price),
    fee: Number(trade.fee ?? 0),
    memo: trade.memo ?? "",
  };
}

function TradesPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);

  useEffect(() => {
    const loadTrades = async () => {
      try {
        const data = await fetchTrades();
        setTrades(data);
      } catch (error) {
        console.error("failed to fetch trades", error);
      }
    };

    void loadTrades();
  }, []);

  // 생성용 핸들러: 폼 값 → API 요청 바디로 변환
  const handleCreateSubmit = async (values: TradeFormValues) => {
    const body = {
      date: values.date,
      type: values.type,
      symbol: values.symbol,
      name: values.name || undefined,
      quantity: values.quantity,
      price: values.price,
      fee: values.fee ?? 0,
      memo: values.memo || undefined,
    };

    const newTrade = await createTrade(body);
    setTrades((previous) => [newTrade, ...previous]);
    setIsModalOpen(false);
  };

  const handleUpdateSubmit = async (values: TradeFormValues) => {
    if (!editingTrade) return;

    const body = {
      date: values.date,
      type: values.type,
      symbol: values.symbol,
      name: values.name || undefined,
      quantity: values.quantity,
      price: values.price,
      fee: values.fee ?? 0,
      memo: values.memo || undefined,
    };

    const updated = await updateTrade(editingTrade.id, body);
    setTrades((previous) => previous.map((trade) => (trade.id === updated.id ? updated : trade)));
    setEditingTrade(null);
    setIsModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setEditingTrade(null);
    setIsModalOpen(true);
  };

  const handleStartEdit = (trade: Trade) => {
    setEditingTrade(trade);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTrade(null);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("정말 이 매매 기록을 삭제할까요?");
    if (!confirmed) return;

    await deleteTrade(id);
    setTrades((previous) => previous.filter((trade) => trade.id !== id));
  };

  const isEditMode = editingTrade !== null;
  const modalTitle = isEditMode ? "매매 기록 수정" : "새 매매 기록 추가";

  const initialFormValues = isEditMode ? mapTradeToFormValues(editingTrade as Trade) : undefined;

  const handleSubmit = isEditMode ? handleUpdateSubmit : handleCreateSubmit;
  const submitLabel = isEditMode ? "수정 완료" : "추가하기";

  return (
    <div className="app-root">
      <div className="app-container">
        <AppHeader />

        <main className="app-main">
          <section className="card">
            <h2 className="card-title">최근 매매 내역</h2>
            <TradeList trades={trades} onEdit={handleStartEdit} onDelete={handleDelete} />
            {trades.length === 0 && (
              <p className="empty-text">
                아직 등록된 매매 내역이 없습니다. 오른쪽 아래 버튼을 눌러 첫 기록을 추가해 보세요.
              </p>
            )}
          </section>
        </main>

        <FloatingAddButton onClick={handleOpenCreateModal} />

        <Modal isOpen={isModalOpen} title={modalTitle} onClose={handleCloseModal}>
          <TradeForm onSubmit={handleSubmit} initialValues={initialFormValues} submitLabel={submitLabel} />
        </Modal>
      </div>
    </div>
  );
}

export default TradesPage;
