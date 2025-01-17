import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/icons/logo.svg';
import { ArrowBackCircleIcon } from '../../../utils/icons';
import { getUrls } from '../../../services/conn/api';

interface HeaderAsideProps{
  isCollapsed?: boolean,
  dotColor?: string,
  module_name?: string,
  goBack?: string
}
export const HeaderAside = ({ isCollapsed, dotColor, module_name, goBack } : HeaderAsideProps) => {
  const navigate = useNavigate();
  const urls = getUrls('front')!;

  return (
    <header className={`relative`} style={{
      borderBottom: '2px dashed rgba(255, 255, 255, .3)'
    }}>
      <button
        type="button"
        className={`
          px-4 py-5
          hidden sm:flex md:hidden
          group-[.collapsed]:flex group-[.collapsed-desktop-aside]:flex
          flex-col gap-1 justify-center items-center
          text-center text-gray-200 mx-auto
        `}
        onClick={() => navigate(goBack ?? '/')}
      >
        {isCollapsed ? (
          <>
            <ArrowBackCircleIcon/>
            <span className="text-[10px] font-semibold uppercase ">Voltar</span>
          </>
        ):( <img className="bg-white rounded-full w-12 h-12" src={logo}/> )}
      </button>
      <div className={`
        flex sm:hidden md:flex flex-col
        group-[.collapsed]:hidden group-[.collapsed-desktop-aside]:hidden
        text-white px-6 py-7
      `}>
        <h2 className="font-medium text-xl">Ivrim</h2>
        <span className="text-xs font-light">{module_name ?? 'Consulting' }</span>
      </div>
      <button
        className={`
          absolute top-0 right-0 bottom-0
          hidden md:flex items-center !outline-none
          group-[.collapsed]:hidden group-[.collapsed-desktop-aside]:hidden
          translate-x-1/2 rounded-full
        `}
        onClick={() => navigate('/')}
      >
        <div className="overflow-clip w-[50%]">
          <div className="bg-background p-1 w-[62px] h-[62px] rounded-full"/>
        </div>
        <img className="bg-white rounded-full w-[54px] h-[54px] absolute ml-1" src={logo}/>
      </button>
      <HeaderDots dotColor={dotColor}/>
    </header>
  )
}
const HeaderDots = ({ dotColor } : { dotColor? : string }) => (
  <>
    <span className={`
      w-1 h-2 block overflow-hidden
      absolute -bottom-1 left-0
    `}>
      <span className={`
        rounded-full bg-background
        w-2 h-2 sm:block -translate-x-1
      `}/>
    </span>
    <span className={`
      w-1 h-2 block overflow-hidden
      absolute -bottom-1 right-0
    `}>
      <span className={`
        rounded-full bg-background
        w-2 h-2 block
      `}/>
    </span>
  </>
)