interface DifferentialItem {
  disorderName: string
  whyNot: string
}

interface DifferentialListProps {
  items: DifferentialItem[]
}

export function DifferentialList({ items }: DifferentialListProps) {
  if (!items.length) {
    return null
  }

  return (
    <div>
      <h4 className="font-semibold text-denim-600">Diferenciais próximos</h4>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item.disorderName} className="rounded-xl border border-surface-200 bg-surface-50 px-3 py-2 text-sm">
            <p className="font-semibold text-slate-800">{item.disorderName}</p>
            <p className="text-slate-700">{item.whyNot}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
