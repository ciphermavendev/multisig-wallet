const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSigWallet", function () {
    let MultiSigWallet;
    let multiSigWallet;
    let owner1;
    let owner2;
    let owner3;
    let addr1;

    beforeEach(async function () {
        [owner1, owner2, owner3, addr1] = await ethers.getSigners();
        
        MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
        multiSigWallet = await MultiSigWallet.deploy(
            [owner1.address, owner2.address, owner3.address],
            2 // Required 2 confirmations
        );
        await multiSigWallet.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owners", async function () {
            expect(await multiSigWallet.isOwner(owner1.address)).to.equal(true);
            expect(await multiSigWallet.isOwner(owner2.address)).to.equal(true);
            expect(await multiSigWallet.isOwner(owner3.address)).to.equal(true);
            expect(await multiSigWallet.isOwner(addr1.address)).to.equal(false);
        });

        it("Should set the right number of required confirmations", async function () {
            expect(await multiSigWallet.numConfirmationsRequired()).to.equal(2);
        });
    });

    describe("Transactions", function () {
        it("Should submit transaction", async function () {
            const tx = await multiSigWallet.submitTransaction(addr1.address, 100, "0x");
            await tx.wait();

            const transaction = await multiSigWallet.getTransaction(0);
            expect(transaction.to).to.equal(addr1.address);
            expect(transaction.value).to.equal(100);
            expect(transaction.executed).to.equal(false);
            expect(transaction.numConfirmations).to.equal(0);
        });

        it("Should confirm and execute transaction", async function () {
            // Submit transaction
            await multiSigWallet.submitTransaction(addr1.address, 100, "0x");

            // First confirmation
            await multiSigWallet.connect(owner1).confirmTransaction(0);
            
            // Second confirmation
            await multiSigWallet.connect(owner2).confirmTransaction(0);

            // Execute transaction
            await multiSigWallet.executeTransaction(0);

            const transaction = await multiSigWallet.getTransaction(0);
            expect(transaction.executed).to.equal(true);
        });
    });
});