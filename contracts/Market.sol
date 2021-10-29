// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "./PuppyNFT.sol";
import "./Token.sol";

contract Market {
    Token private _token;
    PuppyNFT private _puppy;

    constructor(Token token, PuppyNFT puppy) {
        _token = token;
		_puppy = puppy;
    }

    //event Purchase(address indexed buyer, address seller, uint256 crateId);

    function purchaseCrate(address marketplace, uint256 price, uint256 dogType) public {
        address buyer = msg.sender;
        require (
			_token.balanceOf(buyer) > price,
			"You do not have Microshiba token to buy this."
		);
		
        _token.code_approve(buyer, marketplace, price);
        _token.transferFrom(buyer, _puppy.getOrganiser(), price);

         _puppy.transferPuppy(buyer, dogType);
    }
	event Purchase(address indexed buyer, address seller, uint256 crateId);
	
	// Purchase the dog from the secondary market hosted by organiser
    function secondaryPurchase(address marketplace, uint256 dogId) public {
        address seller;
        uint sellingPrice;
		seller = _puppy.ownerOf(dogId);
		sellingPrice = _puppy.getSellingPrice(dogId);
        
        address buyer = msg.sender;        
        uint256 commision = (sellingPrice * 10) / 100;		
		
        _token.code_approve(buyer, marketplace, sellingPrice);
        _token.transferFrom(buyer, seller, sellingPrice - commision);
        _token.transferFrom(buyer, _puppy.getOrganiser(), commision);

       _puppy.secondaryTransferPuppy(buyer, dogId);	

        emit Purchase(buyer, seller, dogId);
    }	

}
