export default function Logo() {
  return (
    <div className="flex items-center">
      <img 
        src="/assets/3.png"
        alt="Atlas HomeServices Logo" 
        className="h-8 w-auto dark:invert"
        onError={(e) => {
          console.error('Error loading logo:', e);
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}