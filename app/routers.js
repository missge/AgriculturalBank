/**
 * Created by liu on 2018/3/4.
 */
import React, { Component } from 'react';
import lazyLoadComponent from 'lazy-load-component';
import {HashRouter,Route}  from 'react-router-dom';
import ReactChildrenMap from  './utils/ReactChildrenMap.js'
const Check = lazyLoadComponent(() => import(/* webpackChunkName: "search" */ './pages/checkContainer/netcheck'));
const Loan = lazyLoadComponent(() => import(/* webpackChunkName: "search" */ './pages/loanInformation/loan'));
const Party = lazyLoadComponent(() => import(/* webpackChunkName: "search" */ './pages/partyInformation/party'));
const Borrower = lazyLoadComponent(() => import(/* webpackChunkName: "search" */ './pages/borrowerInfo/borrower'));
const Credit = lazyLoadComponent(() => import(/* webpackChunkName: "search" */ './pages/creditQuery/credit'));
const MainPage = lazyLoadComponent(() => import(/* webpackChunkName: "search" */ './pages/mainPage'));
const Collect = lazyLoadComponent(() => import(/* webpackChunkName: "search" */ './pages/infoCollection/collect'));
const Lab = lazyLoadComponent(() => import(/* webpackChunkName: "search" */ './pages/labContainer/lab'));
const test = lazyLoadComponent(() => import(/* webpackChunkName: "search" */ './pages/test/test'));

export default () => (
    <HashRouter>
        <div>
            <Route exact path="/" component={MainPage}/>
            <Route path="/check" component={Check}/>
            <Route path="/Loan" component={Loan}/>
            <Route path="/Party" component={Party}/>
            <Route path="/borrower" component={Borrower} />
            <Route path="/credit" component={Credit} />
            <Route path="/collect" component={Collect} />
            <Route path="/lab" component={Lab} />
            <Route path="/test" component={test} />

        </div>
    </HashRouter>
);
