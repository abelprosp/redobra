import './App.css'

function App() {
  return (
    <div style={{ width: '100vw', height: '100dvh', overflow: 'hidden', background: '#000' }}>
      <iframe
        title="Redobrai"
        src="/teste.html"
        style={{ border: 'none', width: '100%', height: '100%', display: 'block' }}
        allowFullScreen
      />
    </div>
  )
}

export default App
