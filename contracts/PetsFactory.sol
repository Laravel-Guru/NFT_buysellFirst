pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./PetsNFT.sol";
import "./PetsMarketplace.sol";

contract PetsFactory is Ownable {
    struct Pets {
        string festName;
        string festSymbol;
        uint256 ticketPrice;
        uint256 totalSupply;
        address marketplace;
    }

    address[] private activeFests;
    mapping(address => Pets) private activeFestsMapping;

    event Created(address ntfAddress, address marketplaceAddress);

    // Creates new NFT and a marketplace for its purchase
    function createNewFest(
        FestToken token,
        string memory festName,
        string memory festSymbol,
        uint256 ticketPrice,
        uint256 totalSupply
    ) public onlyOwner returns (address) {
        PetsNFT newFest =
            new PetsNFT(
                festName,
                festSymbol,
                ticketPrice,
                totalSupply,
                msg.sender
            );

        PetsMarketplace newMarketplace =
            new PetsMarketplace(token, newFest);

        address newFestAddress = address(newFest);

        activeFests.push(newFestAddress);
        activeFestsMapping[newFestAddress] = Pets({
            festName: festName,
            festSymbol: festSymbol,
            ticketPrice: ticketPrice,
            totalSupply: totalSupply,
            marketplace: address(newMarketplace)
        });

        emit Created(newFestAddress, address(newMarketplace));

        return newFestAddress;
    }

    // Get all active fests
    function getActiveFests() public view returns (address[] memory) {
        return activeFests;
    }

    // Get fest's details
    function getFestDetails(address festAddress)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            uint256,
            address
        )
    {
        return (
            activeFestsMapping[festAddress].festName,
            activeFestsMapping[festAddress].festSymbol,
            activeFestsMapping[festAddress].ticketPrice,
            activeFestsMapping[festAddress].totalSupply,
            activeFestsMapping[festAddress].marketplace
        );
    }
}
