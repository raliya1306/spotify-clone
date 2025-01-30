import AudioControls from '@/components/AudioControls'
import AudioPlayer from '@/components/AudioPlayer'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <TopBar />
      <div className='h-100% bg-black text-white flex flex-col'>
        <AudioPlayer />
        <ResizablePanelGroup direction='horizontal' className='flex flex-1 h-full overflow-hidden p-2'>
          <ResizablePanel defaultSize={isMobile ? 20 : 30} minSize={isMobile? 0 : 20} maxSize={isMobile ? 20 : 30}>
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle className='bg-black w-2 rounded-lg' />
          <ResizablePanel defaultSize={isMobile ? 85 : 70}>
            <Outlet />
          </ResizablePanel>
        </ResizablePanelGroup>
        <AudioControls />
      </div>
    </>
  )
}

export default MainLayout