pragma solidity ^0.6.0;

import "./PetsNFT.sol";
import "./PetsToken.sol";

contract PetsMarketplace {
    PetsToken private _token;
    PetsNFT private _Pets;

    address private _organiser;

    constructor(PetsToken token, PetsNFT Pets) public {
        _token = token;
        _Pets = Pets;
        _organiser = _Pets.getOrganiser();
    }

    event Purchase(address indexed buyer, address seller, uint256 ticketId);

    // Purchase tickets from the organiser directly
    function purchaseTicket() public {
        address buyer = msg.sender;

        _token.transferFrom(buyer, _organiser, _Pets.getTicketPrice());

        _Pets.transferTicket(buyer);
    }

    // Purchase ticket from the secondary market hosted by organiser
    function secondaryPurchase(uint256 ticketId) public {
        address seller = _Pets.ownerOf(ticketId);
        address buyer = msg.sender;
        uint256 sellingPrice = _Pets.getSellingPrice(ticketId);
        uint256 commision = (sellingPrice * 10) / 100;

        _token.transferFrom(buyer, seller, sellingPrice - commision);
        _token.transferFrom(buyer, _organiser, commision);

        _Pets.secondaryTransferTicket(buyer, ticketId);

        emit Purchase(buyer, seller, ticketId);
    }
}
