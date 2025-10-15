export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Portal</h1>
      <button className="text-sm text-gray-600 hover:text-black">Logout</button>
    </header>
  );
}
