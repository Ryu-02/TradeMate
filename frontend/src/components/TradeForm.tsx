import { useState } from "react";
import type { FormEvent } from "react";
import type { TradeType } from "../types/trade";

export interface TradeFormValues {
  date: string; // YYYY-MM-DD
  type: TradeType;
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  fee: number;
  memo: string;
}

interface TradeFormProps {
  onSubmit: (values: TradeFormValues) => Promise<void> | void;
  initialValues?: TradeFormValues;
  submitLabel?: string;
}

const defaultValues: TradeFormValues = {
  date: new Date().toISOString().slice(0, 10), // 오늘 날짜
  type: "BUY",
  symbol: "",
  name: "",
  quantity: 0,
  price: 0,
  fee: 0,
  memo: "",
};

export function TradeForm({ onSubmit, initialValues, submitLabel = "추가하기" }: TradeFormProps) {
  const [values, setValues] = useState<TradeFormValues>(initialValues ?? defaultValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setValues((previous) => {
      if (name === "quantity" || name === "price" || name === "fee") {
        return {
          ...previous,
          [name]: value === "" ? 0 : Number(value),
        };
      }

      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        날짜
        <input type="date" name="date" value={values.date} onChange={handleChange} required />
      </label>

      <label>
        매매 유형
        <select name="type" value={values.type} onChange={handleChange} required>
          <option value="BUY">매수</option>
          <option value="SELL">매도</option>
        </select>
      </label>

      <label>
        종목 코드 (티커)
        <input
          type="text"
          name="symbol"
          value={values.symbol}
          onChange={handleChange}
          placeholder="예: AAPL, TSLA"
          required
        />
      </label>

      <label>
        종목명 (선택)
        <input type="text" name="name" value={values.name} onChange={handleChange} placeholder="예: 애플, 테슬라" />
      </label>

      <label>
        수량
        <input type="number" name="quantity" value={values.quantity} onChange={handleChange} min={0} required />
      </label>

      <label>
        가격
        <input type="number" name="price" value={values.price} onChange={handleChange} min={0} step="0.01" required />
      </label>

      <label>
        수수료
        <input type="number" name="fee" value={values.fee} onChange={handleChange} min={0} step="0.01" />
      </label>

      <label>
        메모
        <textarea
          name="memo"
          value={values.memo}
          onChange={handleChange}
          rows={3}
          placeholder="간단히 매매 이유나 상황을 적어 두면 좋아요."
        />
      </label>

      <button type="submit">{submitLabel}</button>
    </form>
  );
}
