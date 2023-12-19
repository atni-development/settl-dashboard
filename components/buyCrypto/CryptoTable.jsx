import Image from "next/image";
import { FaStar } from "react-icons/fa";
import bitcoin from "/public/images/icon/bitcoin.png";
import cardano from "/public/images/icon/cardano.png";
import dogecoin from "/public/images/icon/dogecoin.png";
import eos from "/public/images/icon/eos.png";
import ethereum from "/public/images/icon/ethereum.png";
import polkadot from "/public/images/icon/polkadot.png";
import search from "/public/images/icon/search.png";
import tether from "/public/images/icon/tether.png";
import uniswap from "/public/images/icon/uniswap.png";
import usd from "/public/images/icon/usd.png";
import xrp from "/public/images/icon/xrp.png";

const CryptoTable = () => {
  return (
    <div className="table-area">
      <div className="head-area">
        <h4>Select crypto</h4>
        <form action="#" className="flex-fill">
          <div className="form-group d-flex align-items-center">
            <input type="text" placeholder="Search coin" />
            <button>
              <Image src={search} alt="icon" />
            </button>
          </div>
        </form>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">24h %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <p>
                  <i>
                    <FaStar />
                  </i>
                  1
                </p>
              </th>
              <td>
                <p className="crypto-logo">
                  <Image src={bitcoin} alt="icon" />
                  <span>
                    Bitcoin
                    <span>BTC</span>
                  </span>
                </p>
              </td>
              <td>
                <p>36,641.20</p>
              </td>
              <td>
                <p>+6.04%</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p>
                  <i>
                    <FaStar />
                  </i>
                  2
                </p>
              </th>
              <td>
                <p className="crypto-logo">
                  <Image src={ethereum} alt="icon" />
                  <span>
                    Ethereum
                    <span>ETH</span>
                  </span>
                </p>
              </td>
              <td>
                <p>$2,605.95</p>
              </td>
              <td>
                <p>+6.04%</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p>
                  <i>
                    <FaStar />
                  </i>
                  3
                </p>
              </th>
              <td>
                <p className="crypto-logo">
                  <Image src={eos} alt="icon" />
                  <span>
                    EOS
                    <span>EOS.IO</span>
                  </span>
                </p>
              </td>
              <td>
                <p>$426.32</p>
              </td>
              <td>
                <p>+6.04%</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p>
                  <i>
                    <FaStar />
                  </i>
                  4
                </p>
              </th>
              <td>
                <p className="crypto-logo">
                  <Image src={tether} alt="icon" />
                  <span>
                    Tether
                    <span>USDT</span>
                  </span>
                </p>
              </td>
              <td>
                <p>$1.00</p>
              </td>
              <td>
                <p>+6.04%</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p>
                  <i>
                    <FaStar />
                  </i>
                  5
                </p>
              </th>
              <td>
                <p className="crypto-logo">
                  <Image src={cardano} alt="icon" />
                  <span>
                    Cardano
                    <span>ADA</span>
                  </span>
                </p>
              </td>
              <td>
                <p>$1.86</p>
              </td>
              <td>
                <p>+6.04%</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p>
                  <i>
                    <FaStar />
                  </i>
                  6
                </p>
              </th>
              <td>
                <p className="crypto-logo">
                  <Image src={dogecoin} alt="icon" />
                  <span>
                    Dogecoin
                    <span>DOGE</span>
                  </span>
                </p>
              </td>
              <td>
                <p>$0.4139</p>
              </td>
              <td>
                <p className="highlight">-0.56</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p>
                  <i>
                    <FaStar />
                  </i>
                  7
                </p>
              </th>
              <td>
                <p className="crypto-logo">
                  <Image src={xrp} alt="icon" />
                  <span>
                    XRP
                    <span>XRP</span>
                  </span>
                </p>
              </td>
              <td>
                <p>$1.05</p>
              </td>
              <td>
                <p>+6.04%</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p>
                  <i>
                    <FaStar />
                  </i>
                  8
                </p>
              </th>
              <td>
                <p className="crypto-logo">
                  <Image src={polkadot} alt="icon" />
                  <span>
                    Polkadot
                    <span>DOT</span>
                  </span>
                </p>
              </td>
              <td>
                <p>$27.72</p>
              </td>
              <td>
                <p className="highlight">-0.56</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p>
                  <i>
                    <FaStar />
                  </i>
                  9
                </p>
              </th>
              <td>
                <p className="crypto-logo">
                  <Image src={usd} alt="icon" />
                  <span>
                    USD Coin
                    <span>USDC</span>
                  </span>
                </p>
              </td>
              <td>
                <p>$1.00</p>
              </td>
              <td>
                <p>+6.04%</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p>
                  <i>
                    <FaStar />
                  </i>
                  10
                </p>
              </th>
              <td>
                <p className="crypto-logo">
                  <Image src={uniswap} alt="icon" />
                  <span>
                    Uniswap
                    <span>UNI</span>
                  </span>
                </p>
              </td>
              <td>
                <p className="highlight">$28.67</p>
              </td>
              <td>
                <p>+6.04%</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
