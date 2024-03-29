import App from 'App';
import { lazy, Suspense } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Loading from "components/Loading"


//定义数组每一项的接口
interface IRoute {
    path: string;
    component: any;
    children?: IRoute[];
}

//路由懒加载的实现
const router_arr: IRoute[] = [
    {path: "/", component: App, children: [
        {path: "list", component: lazy(()=>import("pages/List"))},
        {path: "edit/", component: lazy(()=>import("pages/Edit"))},
        {path: "edit/:id", component: lazy(()=>import("pages/Edit"))},
        {path: "means", component: lazy(()=>import("pages/Means"))},
        {path: "namelist", component: lazy(()=>import("pages/NameList"))},
    ]},
    {path: "/login", component: lazy(()=>import("Login"))},
    {path: "/register", component: lazy(()=>import("Register"))},
]

const MyRouter = () => (
    <BrowserRouter basename='/cms-manage/'>
    <Suspense fallback={<Loading />} >
        <Routes>
            {
                router_arr.map((item,index)=>{
                    return(
                    item.children ?
                    <Route key={index} path={item.path} element={<item.component />}>
                        {
                            item.children.map((e, i)=><Route key={i} path={e.path} element={<e.component />}></Route>)
                        }
                    </Route>
                    :
                    <Route key={index} path={item.path} element={<item.component />}></Route>
                    )
                })
            }
        </Routes>
    </Suspense>
    </BrowserRouter>
)

export default MyRouter;