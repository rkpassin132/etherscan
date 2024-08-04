import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { ethers } from "ethers";
import Link from "next/link";
import { SiMinutemailer } from 'react-icons/si';

// INTERNAL
import { Etherescan } from '../Context/Ethere';
import Style from '../styles/index.module.css';
import etherLogo from "../public/eth.png";

const index = () => {
  const router = useRouter();
  const  { yourBlockTrans, transaction } = useContext(Etherescan);

  const [userAccount, setUserAccount] = useState('');

  const convertIntoETH = (amount) => {
    const ETH = ethers.utils.formatUnits(amount, 'ether');
    return ETH;
  }

  const accountAddress = (event) => {
    event.preventDefault();
    let address = document.getElementById("accountAddress").value.trim();
    setUserAccount(address);
    router.push(`/account?${address}`);
    address = '';
  }

  return (
    <div>
      <div className={Style.header}>
        <form className={Style.accountAddress}>
          <input type="text" placeholder="Enter account address" id="accountAddress" onClick={(event) => accountAddress(event)}/>
          <Link href={{pathname: '/account', query: userAccount }}>
            <SiMinutemailer/>
          </Link>
        </form>
      </div>

      <div className={Style.container}>
        <div className={Style.container__box}>
          <h3>Latest Blocks</h3>
          <div className={Style.container__block}>
            {yourBlockTrans.map((ei, i) => (
              <div className={Style.oneBlock} key={i+1}>
                <div className={Style.block}>
                  <div className={Style.info}>
                    <p className={Style.bk}>BK</p>
                    <Link href={{pathname: '/block', query: ei.number}}>{ei.number}</Link>
                  </div>
                  <p>{ei.timestamp}</p>
                </div>
                <div>
                  <div className={Style.miner}>
                    <p>
                      <smap>Miner: &nbsp;&nbsp;
                        <Link className={Style.link} href={{pathname: '/account/', query: ei.miner}}>
                          {ei.miner?.slice(0,35)}...
                        </Link>
                      </smap>
                    </p>
                    <span>
                      <Link className={Style.link} href={{pathname: '/account/', query: ei.number}}>
                        {ei.transaction?.length || 0}
                      </Link>
                      &nbsp;TNS in 3Sec
                    </span>
                  </div>
                  <div className={Style.reward}>
                    <p>{convertIntoETH(ei.baseFeePerGas)} <span>ETH</span></p>
                    <Image src={etherLogo} className={Style.eth} alt="Enter logo" width={10} height={10} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.container__box}>
          <h3>Latest Transaction</h3>
          <div className={Style.container__block}>
              {transaction.map((el, i) => (
                <div className={Style.oneBlock} key={i =1}>
                  <div className={Style.info}>
                    <div>
                      <p className={Style.bx}>TS</p>
                    </div>
                    <Link href={{pathname: '/transaction', query: el}}>
                      Hash:&nbsp; {el.slice(0,55)}..
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default index;
  