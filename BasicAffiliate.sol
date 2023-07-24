//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BasicAffiliate is ERC721Enumerable, Ownable {
    using Strings for uint256;
    string private baseURI;
    string public notRevealedURI;
    uint256 public maxSupply;
    uint256 public publicPrice;
    uint256 public publicSaleStartTime;
    bool public isRevealed;
    // Add this to your variables declarations
    string public contractURI;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _contractURI,
        uint256 _maxSupply,
        uint256 _publicPrice,
        string memory _defaultBaseURI,
        uint256 _publicSaleStartTime,
        string memory _notRevealedURI
    ) ERC721(_name, _symbol) {
        setMaxSupply(_maxSupply);
        setPublicPrice(_publicPrice);
        setContractURI(_contractURI);
        setBaseURI(_defaultBaseURI);
        setNotRevealedURI(_notRevealedURI);
        publicSaleStartTime = _publicSaleStartTime;
        // Ensure commission percentage is between 0 and 10000 (0-100%)
        isRevealed = keccak256(abi.encodePacked(_notRevealedURI)) == keccak256(abi.encodePacked("")) || 
            keccak256(abi.encodePacked(_notRevealedURI)) == keccak256(abi.encodePacked("null"));
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);

        if (from != address(0)) {
            revert("NonTransferableNFT: This token cannot be transferred.");
        }
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        if (isRevealed == false) {
            return notRevealedURI;
        }
        string memory identifier = tokenId.toString();
        return
            bytes(baseURI).length != 0
                ? string(abi.encodePacked(baseURI, identifier, ".json"))
                : "";
    }

    //50%
    uint affiliatePercentIn10000 = 5000;

    function setAffiliatePercentIn10000(uint256 _affiliatePercentIn10000) public onlyOwner {
        affiliatePercentIn10000 = _affiliatePercentIn10000;
    }

    //default refererAddress is owner
    function affiliateMarketingMint( 
        address refererAddress
    ) public payable {
        uint256 supply = totalSupply();
        require(block.timestamp >= publicSaleStartTime, "Public sale not active");
        require(supply + 1 <= maxSupply, "Max supply reached");
        require(msg.value >= publicPrice, "Cost is higher than the amount sent");
        address comissionAddress = owner();
        if (balanceOf(refererAddress) > 0) {
            comissionAddress = refererAddress;
        }
        (bool success, ) = payable(comissionAddress).call{value: publicPrice * affiliatePercentIn10000 / 10000}("");
        require(success, "Transfer failed.");
        _safeMint(msg.sender, supply + 1);
    }

    function adminMint(address _to, uint256 _mintAmount) public onlyOwner {
        uint256 supply = totalSupply();
        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(_to, supply + i);
        }
    }

    function setPublicPrice(uint256 _newPrice) public onlyOwner {
        publicPrice = _newPrice;
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedURI = _notRevealedURI;
    }

    function setMaxSupply(uint256 _newmaxSupply) public onlyOwner {
        maxSupply = _newmaxSupply;
    }

    function setContractURI(string memory _contractURI) public onlyOwner {
        contractURI = _contractURI;
    }

    function togglePublicSaleActive() external onlyOwner {
        if (block.timestamp < publicSaleStartTime) {
            publicSaleStartTime = block.timestamp;
        } else {
            // This effectively disables the public sale by setting the start time to a far future
            publicSaleStartTime = type(uint256).max;
        }
    }

    // Sets the start time of the public sale to a specific timestamp
    function setPublicSaleStartTime(uint256 _publicSaleStartTime) external onlyOwner {
        publicSaleStartTime = _publicSaleStartTime;
    }

    function toggleReveal() external onlyOwner {
        isRevealed = !isRevealed;
    }

    function withdraw() external virtual {
        require(msg.sender == owner(), "Only owner can withdraw");
        uint256 ownerAmount = address(this).balance;
        (bool os, ) = payable(owner()).call{value: ownerAmount}("");
        require(os);
    }
}
