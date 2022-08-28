const { expect } = require("chai");
const { ethers } = require("hardhat");
const {Contract} = require('ethers');
const BigNumber = require('bignumber.js');
const web3 = require("web3");

describe("ERC721 PongHeroNFT V1", async function () {
  let collectionOne;
  let coll;
  
  beforeEach(async () => {
    collectionOne = await ethers.getContractFactory("PongHeroNFTV1");
    coll = await collectionOne.deploy("PongHeroNFT","PHN","https://example.com/");
    //await coll.initialize()
    //coll = await upgrades.deployProxy(collectionOne,["PongHeroNFT","PHN","https://example.com/"],{initializer: 'initialize'});
    await coll.deployed();

  });

  it("Checking Name", async function () {
    expect(await coll.name()).to.equal("PongHeroNFT");
  });

  it("Checking Symbol", async function () {
    expect(await coll.symbol()).to.equal("PHN");
  });

  it("Checking URI", async function () {
    expect(await coll.baseURI()).to.equal("https://example.com/");
  });

  it("Checking Pause Status", async function () {
    expect(await coll.pause()).to.equal(false);
  });

  it("Checking Toggle Pause Function", async function () {
    await coll.togglePause();
    expect(await coll.pause()).to.equal(true);
  });

  it("Checking Treasury Address", async function () {
    expect(await coll.treasuryWallet()).to.equal("0x0000000000000000000000000000000000000000");
  });

  it("Checking Update Treasury Address Function", async function () {
    await coll.updateTreasury("0x63eaEB6E33E11252B10553900a9F38A9ed172871");
    expect(await coll.treasuryWallet()).to.equal("0x63eaEB6E33E11252B10553900a9F38A9ed172871");
  });

  it("Checking Default Mint Fee", async function () {
    expect(await coll.mintFee()).to.equal(0);
  });

  it("Checking Update Mint Fee Function", async function () {
    await coll.updateMintFee("100000000000")
    expect(await coll.mintFee()).to.equal("100000000000");
  });

  it("Checking updateMainURI Function", async function () {
    await coll.updateMainURI("https://meta.com/");
    expect(await coll.baseURI()).to.equal("https://meta.com/");
  });

  it("Checking Minting Function At Pause", async function () {
    expect(await coll.mint()).to.be.reverted;
  });

  it("Checking Minting Function Without Fee", async function () {
  	await coll.updateMintFee("100000000000")
    await expect(coll.mint()).to.be.reverted;
  });

  it("Checking Minting Function With Fee", async function () {
  	await coll.updateMintFee("100000000000")
  	coll.mint({value:100000000000})
    expect(await coll.tokenURI(1)).to.equal("https://example.com/1.json");
  });
  
  it("Checking Unminted NFTs TokenURI", async function () {
    await expect(coll.tokenURI(1)).to.be.reverted;
  });

  it("Checking ownerOf NFTs", async function () {
    await coll.updateMintFee("100000000000")
    coll.mint({value:100000000000})
    const [owner] = await ethers.getSigners();
    expect(await coll.ownerOf(1)).to.equal(owner["address"]);
  });

  it("Checking Transfer Of NFTs", async function () {
    const [owner,account1] = await ethers.getSigners();
    await coll.updateMintFee("100000000000")
    coll.mint({value:100000000000})
    coll.transferFrom(owner["address"],account1["address"],1)
    expect(await coll.ownerOf(1)).to.equal(account1["address"]);
  });


  it("Checking Max Tokens Supply", async function () {
    expect(await coll.maxSupply()).to.equal(3999);
  });


});