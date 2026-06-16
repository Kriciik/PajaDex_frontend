export default function SearchAndFilterSection() {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <button className="px-5 py-2">filter</button>
      <div className="flex">
        <input
          type="text"
          name=""
          id="card-search"
          className="bg-white text-[1.2rem] text-black"
        />
        <button className="px-5 py-2">search</button>
      </div>
    </div>
  );
}
