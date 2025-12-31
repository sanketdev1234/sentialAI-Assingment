// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MetadataRegistry {
    address public admin;

    struct Metadata {
        string ipfsCid;
        bool flagged;
    }

    // tokenId => Metadata
    mapping(uint256 => Metadata) public metadataByToken;

    event MetadataRegistered(
        address indexed owner,
        uint256 indexed tokenId,
        string ipfsCid
    );

    event MetadataFlagged(
        uint256 indexed tokenId,
        bool flagged
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerMetadata(uint256 tokenId, string calldata ipfsCid) external {
        metadataByToken[tokenId] = Metadata(ipfsCid, false);

        emit MetadataRegistered(
            msg.sender,
            tokenId,
            ipfsCid
        );
    }

    function flagToken(uint256 tokenId, bool flag) external onlyAdmin {
        metadataByToken[tokenId].flagged = flag;

        emit MetadataFlagged(tokenId, flag);
    }
}
