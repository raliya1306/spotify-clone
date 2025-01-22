import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  const isMobile = false
  return (
    <>
      <TopBar />
      <div className='h-100% bg-black text-white flex flex-col overflow-x-scroll'>
        <ResizablePanelGroup direction='horizontal' className='flex flex-1 h-full overflow-hidden p-2'>
          <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 14} maxSize={isMobile ? 14 : 30}>
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle className='bg-black w-2 rounded-lg' />
          <ResizablePanel defaultSize={isMobile ? 80 : 60}>
            <Outlet />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  )
}

export default MainLayout