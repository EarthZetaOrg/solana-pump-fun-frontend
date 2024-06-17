export type Pump = {
  "version": "0.1.0",
  "name": "pump",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "CurveConfiguration"
              }
            ]
          }
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fee",
          "type": "f64"
        }
      ]
    },
    {
      "name": "addLiquidity",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "liquidity_pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "mint_token_one"
              }
            ]
          }
        },
        {
          "name": "liquidityProviderAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "LiqudityProvider"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "LiquidityPool",
                "path": "pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "mintTokenOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountOne",
          "type": "u64"
        },
        {
          "name": "amountTwo",
          "type": "u64"
        }
      ]
    },
    {
      "name": "removeLiquidity",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "liquidity_pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "mint_token_one"
              }
            ]
          }
        },
        {
          "name": "liquidityProviderAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "LiqudityProvider"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "LiquidityPool",
                "path": "pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "mintTokenOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "shares",
          "type": "u64"
        }
      ]
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "CurveConfiguration"
              }
            ]
          }
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "liquidity_pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "mint_token_one"
              }
            ]
          }
        },
        {
          "name": "mintTokenOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "style",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "curveConfiguration",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fees",
            "type": "f64"
          }
        ]
      }
    },
    {
      "name": "liquidityProvider",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "shares",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "liquidityPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenOne",
            "type": "publicKey"
          },
          {
            "name": "tokenTwo",
            "type": "publicKey"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "reserveOne",
            "type": "u64"
          },
          {
            "name": "reserveTwo",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DuplicateTokenNotAllowed",
      "msg": "Duplicate tokens are not allowed"
    },
    {
      "code": 6001,
      "name": "FailedToAllocateShares",
      "msg": "Failed to allocate shares"
    },
    {
      "code": 6002,
      "name": "FailedToDeallocateShares",
      "msg": "Failed to deallocate shares"
    },
    {
      "code": 6003,
      "name": "InsufficientShares",
      "msg": "Insufficient shares"
    },
    {
      "code": 6004,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds to swap"
    },
    {
      "code": 6005,
      "name": "InvalidAmount",
      "msg": "Invalid amount to swap"
    },
    {
      "code": 6006,
      "name": "InvalidFee",
      "msg": "Invalid fee"
    },
    {
      "code": 6007,
      "name": "FailedToAddLiquidity",
      "msg": "Failed to add liquidity"
    },
    {
      "code": 6008,
      "name": "FailedToRemoveLiquidity",
      "msg": "Failed to remove liquidity"
    },
    {
      "code": 6009,
      "name": "OverflowOrUnderflowOccurred",
      "msg": "Overflow or underflow occured"
    }
  ]
};

export const IDL: Pump = {
  "version": "0.1.0",
  "name": "pump",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "CurveConfiguration"
              }
            ]
          }
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fee",
          "type": "f64"
        }
      ]
    },
    {
      "name": "addLiquidity",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "liquidity_pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "mint_token_one"
              }
            ]
          }
        },
        {
          "name": "liquidityProviderAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "LiqudityProvider"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "LiquidityPool",
                "path": "pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "mintTokenOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountOne",
          "type": "u64"
        },
        {
          "name": "amountTwo",
          "type": "u64"
        }
      ]
    },
    {
      "name": "removeLiquidity",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "liquidity_pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "mint_token_one"
              }
            ]
          }
        },
        {
          "name": "liquidityProviderAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "LiqudityProvider"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "LiquidityPool",
                "path": "pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "mintTokenOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "shares",
          "type": "u64"
        }
      ]
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "CurveConfiguration"
              }
            ]
          }
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "liquidity_pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "mint_token_one"
              }
            ]
          }
        },
        {
          "name": "mintTokenOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "style",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "curveConfiguration",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fees",
            "type": "f64"
          }
        ]
      }
    },
    {
      "name": "liquidityProvider",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "shares",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "liquidityPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenOne",
            "type": "publicKey"
          },
          {
            "name": "tokenTwo",
            "type": "publicKey"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "reserveOne",
            "type": "u64"
          },
          {
            "name": "reserveTwo",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DuplicateTokenNotAllowed",
      "msg": "Duplicate tokens are not allowed"
    },
    {
      "code": 6001,
      "name": "FailedToAllocateShares",
      "msg": "Failed to allocate shares"
    },
    {
      "code": 6002,
      "name": "FailedToDeallocateShares",
      "msg": "Failed to deallocate shares"
    },
    {
      "code": 6003,
      "name": "InsufficientShares",
      "msg": "Insufficient shares"
    },
    {
      "code": 6004,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds to swap"
    },
    {
      "code": 6005,
      "name": "InvalidAmount",
      "msg": "Invalid amount to swap"
    },
    {
      "code": 6006,
      "name": "InvalidFee",
      "msg": "Invalid fee"
    },
    {
      "code": 6007,
      "name": "FailedToAddLiquidity",
      "msg": "Failed to add liquidity"
    },
    {
      "code": 6008,
      "name": "FailedToRemoveLiquidity",
      "msg": "Failed to remove liquidity"
    },
    {
      "code": 6009,
      "name": "OverflowOrUnderflowOccurred",
      "msg": "Overflow or underflow occured"
    }
  ]
};
