export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="bg-orb -top-40 -right-40 bg-purple-500 opacity-20" />
      <div
        className="bg-orb -bottom-40 -left-40 bg-cyan-500 opacity-20"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="bg-orb top-1/2 left-1/2 bg-green-500 opacity-10"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}
