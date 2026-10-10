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
    <div className="differentials">
      <h4 className="h3">Diferenciais</h4>
      <ul className="grid gap-2">
        {items.map((item) => (
          <li key={item.disorderName} className="card-muted">
            <p>{item.disorderName}</p>
            <p>{item.whyNot}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
