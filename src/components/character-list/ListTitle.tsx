interface ListTitleProps {
  title: string;
}

export function ListTitle({ title }: ListTitleProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
      <h2 className="text-lg font-bold text-white">{title}</h2>
    </div>
  );
}
