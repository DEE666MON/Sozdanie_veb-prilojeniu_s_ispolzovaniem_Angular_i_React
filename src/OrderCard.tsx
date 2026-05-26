type OrderCardProps = {
    order: {id: number; customerName: string; coffeeType: string; status: boolean}
    editingId: number | null
    editingValue: string
    onToggle: (id: number) => void
    onDelete: (id: number) => void
    onEdit: (order: {id: number; customerName: string; coffeeType: string; status: boolean}) => void
    onSave: (id: number) => void
    setEditingValue: (val: string) => void
}
export function OrderCard({order, editingId, editingValue, onToggle, onDelete, onEdit, onSave, setEditingValue}: OrderCardProps) {
    return (
        <li className="flex justify-between items-center gap-3 bg-gray-50 border-gray-300 rounded-xl px-4 py-3 mb-0.5">
            <input type="checkbox" checked={order.status} onChange={() => onToggle(order.id)} className="w-4 h-4 accent-yellow-700 cursor-pointer"/>
            {editingId === order.id ? (
                <input type="text" value={editingValue} onChange={(e) => setEditingValue(e.target.value)} onKeyDown={(e) => {
                if (e.key ==='Enter') onSave(order.id);}} className={``}/>
            ) : (
                <span className={`flex-1 text-sm ${order.status ? 'line-through text-gray-400' : 'text-gray-700'}`}>{order.customerName} — {order.coffeeType}</span>
            )}
            <div>
                {editingId === order.id ? (
                    <button onClick={() => onSave(order.id)}>&#x1F5AC;</button>
                ) : (
                    <button onClick={() => onEdit(order)} className="inline-block -scale-x-100">✎</button>
                )}
                {editingId === order.id ? (
                    <div></div>
                ) : (
                    <button onClick={() => onDelete(order.id)}>&#128465;</button>
                )}
            </div>
        </li>
    )
}