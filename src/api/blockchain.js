// 引入 ethers.js 库
import { ethers } from "ethers";
// 引入 jsencrypt 库
import JSEncrypt from 'jsencrypt';

// 定义合约地址和 ABI
export const contractAddress = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "contractId",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "whitelistId",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "supplierId",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "hospitalId",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "deposit",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dedit",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "blockTime",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "udi",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "hospitalSignature",
          "type": "bytes"
        }
      ],
      "name": "OrderCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "supplierSignature",
          "type": "bytes"
        }
      ],
      "name": "SupplierSignatureStored",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "_contractId",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "_whitelistId",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "_supplierId",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "_hospitalId",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "_deposit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_dedit",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_hospitalSignature",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "_udi",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "createOrderContract",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        }
      ],
      "name": "getOrderDetails",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "contractId",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "whitelistId",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "supplierId",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "hospitalId",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "deposit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "dedit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "blockTime",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "udi",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "hospitalSignature",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "supplierSignature",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nextOrderId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "orders",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "contractId",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "whitelistId",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "supplierId",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "hospitalId",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "deposit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "dedit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "blockTime",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "udi",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "hospitalSignature",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "supplierSignature",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "storeSupplierSignature",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];

export async function connectToEthereum() {
  let provider, signer, contract;
  
  // 检查 web3 是否已定义
  if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined' && window.web3.currentProvider)) {
      // 使用 MetaMask 提供的 Provider
      if (window.ethereum) {
          provider = new ethers.providers.Web3Provider(window.ethereum);
      } else {
          provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
      }
      
      // 获取 Signer
      signer = provider.getSigner();

      try {
          // 请求用户授权连接到以太坊网络
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          // 用户已授权连接到以太坊网络
          console.log("已连接到以太坊网络");

          contract = new ethers.Contract(contractAddress, contractABI, signer);
      } catch (error) {
          // 用户拒绝了连接请求或发生了其他错误
          console.error("连接到以太坊网络失败：", error);
      }
  } else {
      // 如果没有安装 MetaMask 插件，提醒用户安装或使用其他以太坊钱包
      alert("请安装 MetaMask 插件或使用其他以太坊钱包");
  }

  return { provider, contract, signer };
};

// 创建订单
export async function createOrder(row) {
    return new Promise(async (resolve, reject) => {
        const { contract, signer } = await connectToEthereum();

        // 获取当前钱包地址
        const walletAddress = await signer.getAddress();
        console.log("walletAddress:", walletAddress);

        // 设置公钥
        const publicKey = `-----BEGIN PUBLIC KEY-----
         MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9TLVGOWjkbsjHy5Xrrl0
         pUUNsoxOVvr+uR74XtyGKmXzL/gWYbpWm8EmRRd0I3/VV0rXdS9crZ/KnWmUGml9
         vLrgJgMuvGZeg5SFKAlqI5lmh1dKLbwqnLGKdSQVh2yvWJggbGc/YyQF7vZUj6+F
         cT1k1WpYB+LLzSVM1JZRFJxk9S3/7sL3WulN+c/Cq7DN1Jy0VJZ1DB5zbN5rQVtI
         VcqE6K4RRt2krNlCqLsbC2L9uFxIaHScttf5Ex63+bO+h9a7JLmkgKjs5Xo8EVeP
         dx9aSKBC4B/yyUoEBt0Qr7ou5JcVpu+wJij+IQG2phNw44s7j6LP2uwyxzvC2wQs
         YQIDAQAB
        -----END PUBLIC KEY-----`;

        // RSA 加密所有需要加密的字段
        const encryptedContractId = await rsaEncrypt(row.contractid, publicKey);
        const encryptedWhitelistId = await rsaEncrypt(row.whitelistid, publicKey);
        const encryptedSupplierId = await rsaEncrypt(row.supplierid, publicKey);
        const encryptedHospitalId = await rsaEncrypt(row.hospitalid, publicKey);
        const encryptedUdi = await rsaEncrypt(row.udi, publicKey);

        // 构建消息字符串
        const message = `Create order with Contract ID ${encryptedContractId}, Whitelist ID ${encryptedWhitelistId}, Supplier ID ${encryptedSupplierId}, Hospital ID ${encryptedHospitalId}, Deposit ${row.deposit}, Dedit ${row.dedit}, UDI ${encryptedUdi}, and Amount ${row.amount}`;

        // 使用 MetaMask 钱包签名信息
        const hospitalSignature = await signer.signMessage(message);
        console.log(hospitalSignature, "hospitalSignature");

        // 执行创建订单的交易，并捕获订单创建事件
        const tx = await contract.createOrderContract(
          ethers.utils.hexlify(ethers.utils.toUtf8Bytes(encryptedContractId)), 
          ethers.utils.hexlify(ethers.utils.toUtf8Bytes(encryptedWhitelistId)),
          ethers.utils.hexlify(ethers.utils.toUtf8Bytes(encryptedSupplierId)),
          ethers.utils.hexlify(ethers.utils.toUtf8Bytes(encryptedHospitalId)),
          ethers.utils.hexlify(row.deposit), 
          ethers.utils.hexlify(row.dedit), 
          hospitalSignature,
          ethers.utils.hexlify(ethers.utils.toUtf8Bytes(encryptedUdi)), 
          ethers.utils.hexlify(row.amount)
        );

        // 等待交易完成
        const receipt = await tx.wait();
        console.log(receipt, "receipt");

        if (receipt.events && receipt.events.find((e) => e.event === "OrderCreated")) {
            contract.on("OrderCreated", async (orderId) => {
              // 将十六进制的 orderId 转换为十进制数值
              const decimalOrderId = parseInt(orderId, 16);
              console.log("Order created event triggered. Order ID (decimal):", decimalOrderId);
              // 返回 十进制表示的订单 ID
              resolve(decimalOrderId);
            }); 
        } else {
            // 如果没有获取到订单 ID，则在一定时间后 reject
            setTimeout(() => {
                reject("Timeout: Order ID not received");
            }, 60000); // 60 秒超时时间
        }
    });
}

// 存储供应商签名到指定订单
export async function storeSupplierSignature(orderId) {
    const { contract, signer } = await connectToEthereum();

    // 构建消息字符串
    const message = `Store supplier signature for order ID ${orderId}`;

    // 使用 MetaMask 钱包签名信息
    const signedMessage = await signer.signMessage(message);

    // 使用 MetaMask 钱包来调用 storeSupplierSignature 函数
    const tx = await contract.storeSupplierSignature(
        orderId,
        ethers.utils.arrayify(signedMessage)
    );

    await tx.wait();
    // 监听 SupplierSignatureStored 事件
    contract.on("SupplierSignatureStored", (orderId, supplierSignature, event) => {
      console.log("SupplierSignatureStored event triggered:");
      console.log("Order ID:", orderId);
      console.log("Supplier Signature:", supplierSignature);
      console.log("Transaction Hash:", event.transactionHash);
    });
    console.log("Supplier signature stored for order ID:", orderId);
};

export async function getOrderFromBlockchain(orderId) {
    // 创建一个Web3实例
    const { contract } = await connectToEthereum();

    // 调用智能合约函数 orders(uint256)
    const order = await contract.getOrderDetails(orderId);
    
    // 解构订单对象中的属性
    const {
        contractId,
        whitelistId,
        supplierId,
        hospitalId,
        deposit,
        dedit,
        blockTime,
        udi,
        amount,
        hospitalSignature,
        supplierSignature
    } = order;

    // 返回解析后的订单数据
    return {
        contractId,
        whitelistId,
        supplierId,
        hospitalId,
        deposit,
        dedit,
        blockTime,
        udi,
        amount,
        hospitalSignature,
        supplierSignature
    };
}

// 定义 rsaEncrypt 方法
async function rsaEncrypt(data, publicKey) {
    try {
        // 创建 JSEncrypt 实例
        const rsa = new JSEncrypt();
        // 设置公钥
        rsa.setPublicKey(publicKey);
        // 使用公钥加密数据
        const encryptedData = rsa.encrypt(data);
        return encryptedData;
    } catch (error) {
        console.error('RSA encryption error:', error);
        throw error;
    }
}
