// SPDX-License-Identifier: GPL-3.0-or-later 
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}

/**
 * @dev Implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard, including
 * the Metadata extension, but not including the Enumerable extension, which is available separately as
 * {ERC721Enumerable}.
 */
contract ERC721 is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;

    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     */
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return _balances[owner];
    }

    /**
     * @dev See {IERC721-ownerOf}.
     */
    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    /**
     * @dev See {IERC721Metadata-name}.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IERC721Metadata-symbol}.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overriden in child contracts.
     */
    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    /**
     * @dev See {IERC721-approve}.
     */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    /**
     * @dev See {IERC721-getApproved}.
     */
    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");

        return _tokenApprovals[tokenId];
    }

    /**
     * @dev See {IERC721-setApprovalForAll}.
     */
    function setApprovalForAll(address operator, bool approved) public virtual override {
        require(operator != _msgSender(), "ERC721: approve to caller");

        _operatorApprovals[_msgSender()][operator] = approved;
        emit ApprovalForAll(_msgSender(), operator, approved);
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     */
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * `_data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    /**
     * @dev Returns whether `tokenId` exists.
     *
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     */
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ERC721.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `to`.
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, "");
    }

    /**
     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     */
    function _safeMint(
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _mint(to, tokenId);
        require(
            _checkOnERC721Received(address(0), to, tokenId, _data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _beforeTokenTransfer(address(0), to, tokenId);

        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     */
    function _burn(uint256 tokenId) internal virtual {
        address owner = ERC721.ownerOf(tokenId);

        _beforeTokenTransfer(owner, address(0), tokenId);

        // Clear approvals
        _approve(address(0), tokenId);

        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }

    /**
     * @dev Transfers `tokenId` from `from` to `to`.
     *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     *
     * Emits a {Transfer} event.
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        require(ERC721.ownerOf(tokenId) == from, "ERC721: transfer of token that is not own");
        require(to != address(0), "ERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    /**
     * @dev Approve `to` to operate on `tokenId`
     *
     * Emits a {Approval} event.
     */
    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit Approval(ERC721.ownerOf(tokenId), to, tokenId);
    }

    /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) private returns (bool) {
        if (to.isContract()) {
            try IERC721Receiver(to).onERC721Received(_msgSender(), from, tokenId, _data) returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer to non ERC721Receiver implementer");
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}
}

contract AkitaNFT is Context, ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _akitaIds;
    Counters.Counter private _saleAkitaId;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    struct AkitaDetails {
        uint256 purchasePrice;
        uint256 sellingPrice;
        bool forSale;
    }
    struct RoleData { // my code
        mapping(address => bool) members;
        bytes32 adminRole;
    } 

    
    address private _organiser;
    uint256[] private akitasForSale;
    uint256 private _akitaPrice;

    mapping(uint256 => AkitaDetails) private _akitaDetails;
    mapping(address => uint256[]) private purchasedAkitas;
    mapping(bytes32 => RoleData) private _roles; //my code

    constructor(
        string memory TokenName,
        string memory TokenSymbol,
        uint256 akitaPrice,
        address organiser
    ) ERC721(TokenName, TokenSymbol) {
        _setupRole(MINTER_ROLE, organiser);

        _akitaPrice = akitaPrice;
        _organiser = organiser;
    }

    modifier isMinterRole {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "User must have minter role to mint"
        );
        _;
    }
    
    /**
     * my code
     * @dev Grants `role` to `account`.
     *
     * If `account` had not been already granted `role`, emits a {RoleGranted}
     * event. Note that unlike {grantRole}, this function doesn't perform any
     * checks on the calling account.
     *
     * [WARNING]
     * ====
     * This function should only be called from the constructor when setting
     * up the initial roles for the system.
     *
     * Using this function in any other way is effectively circumventing the admin
     * system imposed by {AccessControl}.
     * ====
     */
    function _setupRole(bytes32 role, address account) internal virtual {
        if (!hasRole(role, account)) {
            _roles[role].members[account] = true;
        }
    }

    /**
     * my code
     * @dev Returns `true` if `account` has been granted `role`.
     */
    function hasRole(bytes32 role, address account) public view returns (bool) {
        return _roles[role].members[account];
    }

    /*
     * Mint new akitas and assign it to operator
     * Access controlled by minter only
     * Returns new akitaId
     */
    function mint(address operator)
        internal
        virtual
        isMinterRole
        returns (uint256)
    {
        _akitaIds.increment();
        uint256 newAkitaId = _akitaIds.current();
        _mint(operator, newAkitaId);

        _akitaDetails[newAkitaId] = AkitaDetails({
            purchasePrice: _akitaPrice,
            sellingPrice: 0,
            forSale: false
        });

        return newAkitaId;
    }

    /*
     * Bulk mint specified number of akitas to assign it to a operator
     * Modifier to check the akita count is less than total supply
     */
    function bulkMintAkitas(uint256 numOfAkitas, address operator)
        public
        virtual
    {        
        for (uint256 i = 0; i < numOfAkitas; i++) {
            mint(operator);
        }
    }

    /*
     * Primary purchase for the akitas
     * Adds new customer if not exists
     * Adds buyer to akitas mapping
     * Update akita details
     */
    function transferAkita(address buyer) public {
        _saleAkitaId.increment();
        uint256 saleAkitaId = _saleAkitaId.current();

        require(
            msg.sender == ownerOf(saleAkitaId),
            "Only initial purchase allowed"
        );

        transferFrom(ownerOf(saleAkitaId), buyer, saleAkitaId);

        purchasedAkitas[buyer].push(saleAkitaId);
    }

    /*
     * Secondary purchase for the akitas
     * Modifier to validate that the selling price shouldn't exceed 110% of purchase price for peer to peer transfers
     * Adds new customer if not exists
     * Adds buyer to akitas mapping
     * Remove akita from the seller and from sale
     * Update akita details
     */
    function secondaryTransferAkita(address buyer, uint256 saleAkitaId)
        public
    {
        address seller = ownerOf(saleAkitaId);
        uint256 sellingPrice = _akitaDetails[saleAkitaId].sellingPrice;

        transferFrom(seller, buyer, saleAkitaId);

        purchasedAkitas[buyer].push(saleAkitaId);

        removeAkitaFromCustomer(seller, saleAkitaId);
        removeAkitaFromSale(saleAkitaId);

        _akitaDetails[saleAkitaId] = AkitaDetails({
            purchasePrice: sellingPrice,
            sellingPrice: 0,
            forSale: false
        });
    }

    /*
     * Add akita for sale with its details
     * Validate that the selling price shouldn't exceed 110% of purchase price
     * Organiser can not use secondary market sale
     */
    function setSaleDetails(
        uint256 akitaId,
        uint256 sellingPrice,
        address operator
    ) public {
        uint256 purchasePrice = _akitaDetails[akitaId].purchasePrice;

        require(
            purchasePrice + ((purchasePrice * 110) / 100) > sellingPrice,
            "Re-selling price is more than 110%"
        );

        _akitaDetails[akitaId].sellingPrice = sellingPrice;
        _akitaDetails[akitaId].forSale = true;

        if (!isSaleAkitaAvailable(akitaId)) {
            akitasForSale.push(akitaId);
        }

        approve(operator, akitaId);
    }

    // Get akita actual price
    function getAkitaPrice() public view returns (uint256) {
        return _akitaPrice;
    }
	
    // Get organiser's address
    function getOrganiser() public view returns (address) {
        return _organiser;
    }

    // Get current akitaId
    function akitaCounts() public view returns (uint256) {
        return _akitaIds.current();
    }

    // Get next sale akitaId
    function getNextSaleAkitaId() public view returns (uint256) {
        return _saleAkitaId.current();
    }

    // Get selling price for the akita
    function getSellingPrice(uint256 akitaId) public view returns (uint256) {
        return _akitaDetails[akitaId].sellingPrice;
    }

    // Get all akitas available for sale
    function getAkitasForSale() public view returns (uint256[] memory) {
        return akitasForSale;
    }

    // Get akita details
    function getAkitaDetails(uint256 akitaId)
        public
        view
        returns (
            uint256 purchasePrice,
            uint256 sellingPrice,
            bool forSale
        )
    {
        return (
            _akitaDetails[akitaId].purchasePrice,
            _akitaDetails[akitaId].sellingPrice,
            _akitaDetails[akitaId].forSale
        );
    }

    // Get all akitas owned by a customer
    function getAkitasOfCustomer(address customer)
        public
        view
        returns (uint256[] memory)
    {
        return purchasedAkitas[customer];
    }

    // Utility function used to check if akita is already for sale
    function isSaleAkitaAvailable(uint256 akitaId)
        internal
        view
        returns (bool)
    {
        for (uint256 i = 0; i < akitasForSale.length; i++) {
            if (akitasForSale[i] == akitaId) {
                return true;
            }
        }
        return false;
    }

    // Utility function to remove akita owned by customer from customer to akita mapping
    function removeAkitaFromCustomer(address customer, uint256 akitaId)
        internal
    {
        uint256 numOfAkitas = purchasedAkitas[customer].length;
		uint256 label = 0;
        for (uint256 i = 0; i < numOfAkitas; i++) {
            if (purchasedAkitas[customer][i] == akitaId) {
                label = i + 1;
            }
        }
		if (label != 0){
			for (uint256 j = label; j < numOfAkitas; j++) {
				purchasedAkitas[customer][j - 1] = purchasedAkitas[customer][j];
			}
			purchasedAkitas[customer].pop();
		}
    }

    // Utility function to remove akita from sale list
    function removeAkitaFromSale(uint256 akitaId) internal {
        uint256 numOfAkitas = akitasForSale.length;
		uint256 label = 0;
        for (uint256 i = 0; i < numOfAkitas; i++) {
            if (akitasForSale[i] == akitaId) {
                label = i + 1;
            }
        }
		if (label != 0){
			for (uint256 j = label; j < numOfAkitas; j++) {
				akitasForSale[j - 1] = akitasForSale[j];
			}
			akitasForSale.pop();
		}
    }
}
