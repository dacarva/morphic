// SPDX-License-Identifier: MIT

pragma solidity >=0.8.13 <0.9.0;

import "@fhenixprotocol/contracts/FHE.sol";
import {Permissioned, Permission} from "@fhenixprotocol/contracts/access/Permissioned.sol";
import { Console } from "@fhenixprotocol/contracts/utils/debug/Console.sol";

contract Score is Permissioned {
  struct ModelParameters {
    ebool created;
    euint16 k; // constant
    euint16 k_i; // Income coefficient
    bool k_i_s; // Sign of the income coefficient
    euint16 k_c; // Credit coefficient
    bool k_c_s; // Sign of the credit coefficient
    euint16 k_l; // Credit history lentgh coefficient
    bool k_l_s; // Sign of the credit history lentgh coefficient
    euint16 k_d; // Defi coefficient
    bool k_d_s; // Sign of the defi coefficient
  }

  uint8 coefficients_decimals = 4;

  mapping(address => ModelParameters) private modelParameters;

  function addModel(
    inEuint16 calldata _k,
    inEuint16 calldata _k_i,
    bool _k_i_s,
    inEuint16 calldata _k_c,
    bool _k_c_s,
    inEuint16 calldata _k_l,
    bool _k_l_s,
    inEuint16 calldata _k_d,
    bool _k_d_s
  ) public {
    modelParameters[msg.sender] = ModelParameters(
      FHE.asEbool(true),
      FHE.asEuint16(_k),
      FHE.asEuint16(_k_i),
      _k_i_s,
      FHE.asEuint16(_k_c),
      _k_c_s,
      FHE.asEuint16(_k_l),
      _k_l_s,
      FHE.asEuint16(_k_d),
      _k_d_s
    );
  }

  function hasModel(
    Permission memory permission
  ) public view onlySender(permission) returns (bool) {
    ModelParameters memory userModel = modelParameters[msg.sender];
    return FHE.decrypt(userModel.created);
  }

  function predictScore(
    Permission memory permission,
    inEuint16 calldata _income,
    inEuint16 calldata _dti,
    inEuint16 calldata _credit_history_length
  ) public view onlySender(permission) returns (uint16) {
    // The credit score is calculated as a linear combination of the input features
    // and the model parameters
    // score = k + k_i * income + k_c * dti + k_l * credit_history_length + k_d

    ModelParameters memory userModel = modelParameters[msg.sender];

    euint16 acc = userModel.k;
    ebool is_k_i_s_positive = FHE.asEbool(userModel.k_i_s);
		ebool is_k_c_s_positive = FHE.asEbool(userModel.k_c_s);
		ebool is_k_l_s_positive = FHE.asEbool(userModel.k_l_s);
		ebool is_k_d_s_positive = FHE.asEbool(userModel.k_d_s);

    acc = FHE.select(
      is_k_i_s_positive,
      acc + userModel.k_i * FHE.asEuint16(_income),
      acc - userModel.k_i * FHE.asEuint16(_income)
    );

		acc = FHE.select(
			is_k_c_s_positive,
			acc + userModel.k_c * FHE.asEuint16(_dti),
			acc - userModel.k_c * FHE.asEuint16(_dti)
		);

		acc = FHE.select(
			is_k_l_s_positive,
			acc + userModel.k_l * FHE.asEuint16(_credit_history_length),
			acc - userModel.k_l * FHE.asEuint16(_credit_history_length)
		);

		acc = FHE.select(
			is_k_d_s_positive,
			acc + userModel.k_d,
			acc - userModel.k_d
		);

    return FHE.decrypt(acc);
  }
}
