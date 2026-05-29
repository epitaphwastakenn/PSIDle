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
      <h4 className="font-semibold text-[color:var(--text-strong)]">Diferenciais proximos</h4>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item.disorderName} className="panel-soft px-3 py-2 text-sm">
            <p className="font-semibold text-[color:var(--text-strong)]">{item.disorderName}</p>
            <p className="text-[color:var(--text-body)]">{item.whyNot}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
