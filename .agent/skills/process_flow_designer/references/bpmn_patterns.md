# 🔀 Process Flow — BPMN Patterns & Mermaid Syntax

## 1. Mermaid Flowchart Conventions

```
Start/End:    ([Bắt đầu]) / ([Kết thúc])
Process:      [Bước thực hiện]
Decision:     {Điều kiện?}
Subprocess:   [[Sub-process]]
Database:     [(Database)]
Document:     >Document]
```

## 2. Common Flow Patterns

### Linear Flow
```mermaid
flowchart LR
    A([Start]) --> B[Step 1] --> C[Step 2] --> D([End])
```

### Decision Branch
```mermaid
flowchart TD
    A[Check] --> B{Valid?}
    B -->|Yes| C[Process]
    B -->|No| D[Error]
```

### Parallel Paths
```mermaid
flowchart TD
    A[Start] --> B[Task A]
    A --> C[Task B]
    B --> D[Merge]
    C --> D
```

## 3. Quy Trình Phân Tích

1. **Xác định Scope:** Trigger + Actors + Outcome
2. **Vẽ AS-IS:** Flowchart hiện tại + Pain points ⚠️
3. **Vẽ TO-BE:** Flowchart cải tiến + Highlights ✅
4. **So sánh:** Bảng Before/After + ROI

## 4. Checklist Quality

- [ ] Đúng 1 Start, ít nhất 1 End
- [ ] Mọi Decision đều có ≥ 2 nhánh
- [ ] Không có dead end (node không đi đâu)
- [ ] Không quá 15 bước (split nếu vượt)
- [ ] Exception/error paths có mặt
- [ ] Thời gian ước lượng cho mỗi bước (nếu biết)
