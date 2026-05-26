type Order = {
  id: number
  customerName: string
  coffeeType: string
  status: boolean
}

import { useState, useEffect } from "react";
import { OrderCard } from "./OrderCard"

export default function App(){
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders')
    return saved ? JSON.parse(saved) : []
  })
  const [inputValue, setInputValue] = useState("")
  const [coffeeTypeValue, setCoffeeTypeValue] = useState("")
  const [filter, setFilter] = useState<'all' | 'pending' | 'ready'>('all')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState('')

  const handleAddOrder = () => {
    if (inputValue.trim() === '') return
    if(coffeeTypeValue.trim() === '') return
    const newOrder: Order = {
      id: Date.now(),
      customerName: inputValue,
      coffeeType: coffeeTypeValue,
      status: false
    }
    setOrders([...orders, newOrder])
    setInputValue('')
    setCoffeeTypeValue('')
  }
  const handleDeleteOrder = (idToDelete: number) => {
    setOrders(orders.filter((order) => order.id !== idToDelete))
  }
  const handleToggle = (idToToggle: number) => {
    setOrders(orders.map((order) => order.id === idToToggle ? {...order, status: !order.status} : order))
  }
  const handleEdit = (order: Order) => {
    setEditingId(order.id)
    setEditingValue(order.customerName)
  }
  const handleSave = (id: number) => {
    if (editingValue.trim() == "") return
    setOrders(orders.map((order) => order.id === id ? {...order, customerName: editingValue} : order))
    setEditingId(null)
    setEditingValue('')
  }
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])
  const filteredOrders = orders.filter(order => {
    if (filter === 'pending') return !order.status
    if (filter === 'ready') return order.status
    return true
  })
  return (
    <div className="min-h-screen bg-yellow-700 flex justify-center pt-16">
      <div className="bg-yellow-100 rounded-2xl shadow-lg w-full max-w-lg p-6">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Управление заказами в кофейне</h1>
        <div className="flex flex-col gap-1 mt-5">
          <input type="text" placeholder="Имя клиента" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddOrder();}} className="border border-gray-300 rounded-lg px-3 py-1 text-sm outline-none focus:bg-yellow-700 transition-colors"/>
          <input type="text" placeholder="Название напитка" value={coffeeTypeValue} onChange={(e) => setCoffeeTypeValue(e.target.value)} onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddOrder();}} className="border border-gray-300 rounded-lg px-3 py-1 text-sm outline-none focus:bg-yellow-700 transition-colors"/>
          <button onClick={handleAddOrder} className="bg-yellow-700 hover:bg-yellow-500 text-white font-medium py-2 rounded-lg transition-colors">Добавить заказ</button>
        </div>
        <div className="flex gap-2 my-5">
          <button onClick={() => setFilter('all')} className={`rounded-full font-medium px-2 py-1 transition-colors ${filter === 'all' ? 'bg-yellow-700 text-white' : 'bg-yellow-500 text-gray-600 hover:bg-yellow-300'}`}>Всё</button>
          <button onClick={() => setFilter('pending')} className={`rounded-full font-medium px-2 py-1 transition-colors ${filter === 'pending' ? 'bg-yellow-700 text-white' : 'bg-yellow-500 text-gray-600 hover:bg-yellow-300'}`}>Готовятся</button>
          <button onClick={() => setFilter('ready')} className={`rounded-full font-medium px-2 py-1 transition-colors ${filter === 'ready' ? 'bg-yellow-700 text-white' : 'bg-yellow-500 text-gray-600 hover:bg-yellow-300'}`}>Готовы к выдаче</button>
        </div>
        <ul>
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order} 
              editingId={editingId} 
              editingValue={editingValue}
              onToggle={handleToggle} 
              onDelete={handleDeleteOrder} 
              onEdit={handleEdit} 
              onSave={handleSave} 
              setEditingValue={setEditingValue}/>
          ))}
        </ul>
      </div>
    </div>
  )
}