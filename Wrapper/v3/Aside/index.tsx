import { CloseIcon } from '../../../utils/icons';
import { Fragment, ReactNode } from 'react';
import { HeaderAside } from './HeaderAside';
import { FooterAside, FooterAsideProps } from './FooterAside';
import { AsideLiItem } from './AsideLiItem';


export interface AsideItems {
  id: string,
  href?: string,
  onClick?: () => void,
  icon?: ReactNode,
  name: string,
  disabled?: boolean,
  items?: Omit<AsideItems, 'items'>[]
}
interface AsideProps {
  active?: string | string[],
  items: AsideItems[],
  dynamicItems: AsideItems[],
  footerItems?: FooterAsideProps['footerItems'],
  isCollapsed?: boolean,
  dotColor?: string,
  module_name?: string,
  goBack?: string
}
export const Aside = ({ active, items, dynamicItems, footerItems, isCollapsed, dotColor, module_name, goBack } : AsideProps) => (
  <div className="
    w-full h-full max-sm:hidden
    group-[.expanded-aside]:max-sm:bg-gray-700/75
    group-[.expanded-aside]:max-sm:flex
    group-[.expanded-aside]:max-sm:absolute 
    group-[.expanded-aside]:max-sm:z-50
    group-[.expanded-aside]:max-sm:inset-y-0
  ">
    <aside className={`
      max-sm:bg-gray-900
      bg-gradient-aside
      
      sm:rounded-xl group
      max-sm:flex sm:flex 
      flex-col ${isCollapsed ? 'collapsed' : ''} 
      md:mx-0 h-full
      max-sm:w-[200px]
    `}>
      <HeaderAside {...{ dotColor, isCollapsed, module_name, goBack }} />
      <div className="flex flex-col justify-between flex-1 text-white">
        <div className="
          flex flex-col justify-between flex-1
          max-h-[calc(100vh-12rem)] overflow-y-auto
        ">
          <ul className="
            p-4 md:p-5 mb-8
            group-[.collapsed]:p-4 group-[.collapsed-desktop-aside]:p-4
          ">
            {items.map((item, i) => <AsideLiItem item={item} key={`${item.id}-${i}`} active={active} />)}
            {dynamicItems.length > 0 && (
              <div className="w-full h-[1px] my-3 bg-gray-50/50" />
            )}
            {dynamicItems.map((item) => <AsideLiItem item={item} key={item.id} active={active} />)}
          </ul>
          {footerItems && footerItems.length > 0 && (
            <ul className="px-2 py-4">
              {footerItems.map((item, i) => (
                <Fragment key={`${item.type}-${i}`}>
                  {item.type === 'aside-item' ? (
                    <div className="bg-gray-100/20 rounded-lg">
                      <AsideLiItem item={item.content}/>
                    </div>
                  ): item.content}
                </Fragment>
              ))}
            </ul>
          )}
        </div>
        <FooterAside {...{ footerItems }}/>
      </div>
    </aside>
    <div
      className="flex-1 hidden group-[.expanded-aside]:max-sm:flex items-start p-2.5"
      onClick={() => {
        let body = document.body;
        if (body) body.classList.remove('expanded-aside');
      }}
    >
      <button
        type="button"
        className="text-gray-200/70 rounded-full focus:ring-gray-50/50 focus:outline-none focus:ring-2 focus:ring-offset-2"
      ><CloseIcon /></button>
    </div>
  </div>
);