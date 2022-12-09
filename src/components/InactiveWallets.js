import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useGetNftsQuery } from "../services/alchemyApi";
import useIdFilter from "../functions/useIdFilter";
import TitleMain from "./subcomponents/TitleMain";
import ApesMain from "./subcomponents/ApesMain";
import SortMain from "./subcomponents/SortMain";
import Web3 from "web3";
import { useGetHoldersQuery } from "../services/alchemyApi";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { useGetTokenHoldersQuery } from "../services/alchemyApi";

const web3 = new createAlchemyWeb3(
  "https://eth-mainnet.g.alchemy.com/v2/weAIDXHKw7995TqqNVUtFtLATPvXpYhz"
);

const { Content } = Layout;

const InactiveWallets = () => {
  const [addresses, setAddresses] = useState(["hello"]);

  const wallets = [
    4969, 3432, 2642, 168, 1506, 736, 968, 198, 700, 678, 1462, 1124, 677, 2678,
    2276, 4303, 1010, 2714, 230, 4684, 306, 1549, 2322, 1597, 4732, 2622, 2711,
    4666, 3233, 3527, 795, 4274, 8389, 6766, 698, 1413, 1503, 4936, 5966, 6482,
    5062, 2389, 6971, 2698, 7302, 2697, 6250, 3522, 7452, 2345, 3190, 2713,
    6877, 2618, 6416, 5765, 5500, 8442, 4077, 6789, 9353, 5287, 5266, 2550,
    4906, 6817, 4499, 3188, 8608, 8878, 1018, 6820, 3139, 5797, 8770, 6098,
    2700, 7180, 6884, 4863, 6883, 5422, 5736, 8697, 2131, 3581, 2709, 3422,
    4514, 681, 4828, 3793, 8085, 6102, 8924, 8324, 5615, 683, 7743, 826, 5809,
    2696, 5833, 7600, 1644, 679, 3436, 2701, 4097, 2708, 5835, 7824, 1759, 4569,
    7921, 8622, 6862, 6228, 8430, 1773, 7850, 2372, 6908, 5498, 8112, 1884,
    9959, 699, 8624, 6835, 8052, 3525, 503, 2991, 2862, 8860, 9040, 4387, 5504,
    9796, 1338, 9009, 9095, 8072, 2703, 7239, 8470, 8846, 9247, 2771, 9579,
    9791, 4393, 4531, 534, 7286, 3910, 3348, 2285, 9557, 5126, 3369, 2702, 4078,
    697, 2604, 3667, 9014, 9601, 568, 605, 7065, 2660, 7537, 675, 9777, 5444,
    2095, 6924, 9854, 3944, 2447, 3884, 1194, 2705, 8542, 9164, 2215, 2326,
    2257, 674, 2695, 6291, 5675, 9207, 6107, 8045, 7309, 4505, 9259, 7571, 2707,
    2179, 680, 4800, 2681, 9807, 6245, 4093, 2053, 7940, 9883, 2504, 3830, 9325,
    2712, 8764, 6747, 2756, 8080, 9480, 7299, 5625, 8207, 5371, 9017, 2277,
    2864, 7445, 3568, 5258, 9332, 4332, 2080, 2199, 8937, 8565, 6778, 8671,
    4533, 6690, 7304, 8798, 7212, 6265, 3807, 1031, 5325, 4637, 9072, 5149,
    9139, 4885, 7580, 7060, 9554, 3762, 4754, 9909, 2615, 6473, 9546, 4672,
    9142, 2706, 5123,
  ];

  //   useEffect(() => {
  //     wallets.map(wallet => {
  //     const token = useGetTokenHoldersQuery(wallet).data.owners[0]
  //     setAddresses(addresses => [...addresses, token])
  // })
  //   },[])

  // console.log(useGetTokenHoldersQuery(0).data?.owners[0])
  // useGetHoldersQuery()?.data?.ownerAddresses.filter((token) =>
  //   token.tokenBalances.filter((token) => token.tokenId)
  // );
  // useGetHoldersQuery()?.data?.ownerAddresses.map(address => console.log(address.ownerAddress))

  // const { data, isFetching } = useGetHoldersQuery();

  const lastOthersideBlock = 14680891;

  // const jack = data?.ownerAddresses?.map((address) => address.ownerAddress);

  const sam = [
    "0x000000000000000000000000000000000000dead",
    "0x0001bb2a72173f3a1aaae96bd0ddb1f8be4f91b7",
    "0x001fd093d89b24f7de35bc47b6d01c750f398707",
    "0x0028109b8b6ca54e7e1c372cfc2a68b7e477cd43",
    "0x00401092edc6b62d250df362c640a618a8c1052a",
    "0x00584363400c0b874277edd8cb16bc58b4b00ae2",
    "0x00625b930019707240c1d8975474578a8bc3cc57",
    "0x00652700cb56bd11a52fcfb5709f89b70a445208",
    "0x00698fc49926c4e56fe6937f88bc15ad793182da",
    "0x006b1609f3b44430f9899f4f6083cfcff5d8bf9b",
    "0x0075ba8bbb3f9177d14ce60881c6d5479d36ed91",
    "0x00774750c8017f3cf313bda8a0780e98781f4330",
    "0x007f65e390a9cac52524d4be52ce84b871b48bef",
    "0x0085c0659ac63716e6a9f7a1b2de9706e50267b1",
    "0x00938c216c0f976410a68fb0748441d94d4abf0f",
    "0x009e1203889e3388f0f2f8ee76c55a4393520e11",
    "0x00ab23a3704d2b550a2c1f5ffc00e728e76ca3bd",
    "0x00ac4257d3848f6e2e3a64d30f221b3fa095ae8f",
    "0x00bb9221daaaf8a703fa19f8ce4822fe8c1b87eb",
    "0x00bfbcca7c2b84fa498112e83f22f370ad00e98c",
    "0x00c850633ca5c843b8f8fceae73f5ea4d6adb3b1",
    "0x00cd7fb26752c092a9a45029a35515a46d6e1e76",
    "0x00d29b948361f32e6e451a4cb4f73fe3b401f7c6",
    "0x00d47813ceb797f084dc0d7aae5c456545ca5a3a",
    "0x00d9711e2defb1b94dcffe6e962d5188f3ae9e52",
    "0x00df0a54fb57bb4a999b0e3e3746edf52ab44c7b",
    "0x00f29ed858a03fd32f892f6decda7ddbe412af44",
    "0x00f30da49c6dde3364ac802b9b318a872996995b",
    "0x010d1ae300ebbfe8e31e53ef8bebd59a8169a3f5",
    "0x011093322a9cbdc707b371996f8b4100bfa8793c",
    "0x011a6f601ac7307a8e091e7d62b14b00802af217",
    "0x011c23b3aadaf3d4991f3abee262a34d18e9fdb5",
    "0x0123b036a7b812335ab6ffb0110216f24e6669b1",
    "0x0124f48be054c51237836a682cdba6e424d7f6f9",
    "0x013b1f85d0a53be1ef1ca75b4a29c34a2222020a",
    "0x015235713211e9a8584b4893f0c4a8ab72d3790a",
    "0x015cd3cc96369ee6d47937ed566557e1ae954c69",
    "0x0164bab4861267188aa7e119bb14b291c5028d3e",
    "0x01684729a90618a2e2db9c4d07c35334a175e8bc",
    "0x016b375e4fc62b0186228a54579c6132667d94c4",
    "0x016e7ebcfba2daaa34b6fd3e8d8eb384b5b52aa7",
    "0x0172e05392aba65366c4dbbb70d958bbf43304e4",
    "0x017c4dc18a2d67e82a49c4359016e50fd8e63233",
    "0x0184670b561ce2a85c97b11b06116c2b0a044663",
    "0x0184df2afb9845c27504419ac7d5efccae41b951",
    "0x01924ea6111e3ae36e2519c70af8b45fd53d53cd",
    "0x0198cc6f56f6a772d455fcd378b163284887dc59",
    "0x0199c7394c1cb6abb6b2932c038e49496cbcdff7",
    "0x019a86dc0b3ccb5b08c5b6cc3df55ad5e76835ea",
    "0x01a23eba5023064d505dd45fbfa683a601c7685b",
    "0x01a49bb89db31c340bfbe474f944944b96b2ebfb",
    "0x01a4bdb901152a7ee30bd396b47084cf34fa5ef1",
    "0x01ab2a5faf8933c55bdd1e1f8db5abdd22173bf6",
    "0x01b426ca936ba3d0d45d688e48208806073bffe9",
    "0x01b4fd3a125d0705525c6cf73310992a99981c67",
    "0x01c20350ad8f434bedf6ea901203ac4cf7bca295",
    "0x01c463dfcbd285cf4733f6ec1e4bf58e8182b088",
    "0x01c5b8228fde91347737280c97bcebd5dc8f4812",
    "0x01d16da96d759ddde40eb5a8a64355c53dabf9dd",
    "0x01de321ebe92e51b1cf0610cfed109c0877ff980",
    "0x01e41570d37afda148b864a2c8ed9b385088d541",
    "0x01f9ecead3a16c29b2f277e1ce018cf3985b2597",
    "0x01fadbfbd41e1b80774572b9745af2bd5582a404",
    "0x0201cfaa262967fe74178f3719694e5911545eda",
    "0x020ca66c30bec2c4fe3861a94e4db4a498a35872",
    "0x020e3bab43c5e1bc5116bd13ff0ca012f15d32e3",
    "0x02113e8d06a7ab70bed0ca583ec441fcf4cd37f1",
    "0x02159531d9aad248189be4c7c307192e81a90e69",
    "0x021b927e87b8b1a8426761bcca700b47a56ed3c6",
    "0x0220e0b5a23bf2419e643de74649a01bf77960ee",
    "0x02245c0a611064ed72cf9610eeaca045ff8aea39",
    "0x022885692db44c78c4af5088a37ce811937b1934",
    "0x0232d1083e970f0c78f56202b9a666b526fa379f",
    "0x0253de2863975260822611086835571f86b7794f",
    "0x025577fc6163751ce81801dacc945cd543f6376f",
    "0x025f34a94b7cb0e2749f190893f2c023ea2fc074",
    "0x027aeece6ad65d61ae5abb85552e6631956518cb",
    "0x028134db627930c9a355261c83b86e2b40152304",
    "0x0288c6e8adaae6304aa99ac975bfb80edd8161bf",
    "0x028b91c2da0eaacc4c6ba656e78d8e051a091540",
    "0x02943a285b2d597da8e7673eb325ee1d5f59a9f6",
    "0x02954549a3e81884f020607d6a7d30eea96008ba",
    "0x0298c4536873f4530dfc26a4fa863c9c86818ea4",
    "0x029e0619b5ba062334eb8ce96ee48257edfa7f89",
    "0x02a0ce9b0a1afbc488892a6faf22f3ea0d83de9d",
    "0x02a522d98ec2d2c3bbe91acc29ee7fd32ab880ab",
    "0x02a6200876cbaa8e0a1282fe0d22dd551ef39e95",
    "0x02aeb12821c2c18a61373b1931de24b0c4f2e7f0",
    "0x02b074bd20a731dbc63ace11354a5b40d7056823",
    "0x02b8c2a2893a130d42a13fdbf6d695da83116448",
    "0x02c6095d0e24e0e81806494a77bd863ae2435f0a",
    "0x02d53ac91ef54bca4f557ae776579799d6fb4da3",
    "0x02dcce9e0aa57881dd15d09ad904c6ff93f0c059",
    "0x02f7b20446f220568e226db160029f68326974d4",
    "0x02fef8e09bd782d7a0628e9bb5f56977fd2d4802",
    "0x031767bd8e6e23c2d9fb0badddae8f1778a5849e",
    "0x034c4322251c8eec17a1667e629e072a70f4dc35",
    "0x034c446b223bb4ffbd51d2e284fe6b3cdd271315",
    "0x03546b22bc80b3e6b64c4445963d981250267a68",
    "0x0359e5cb17c3f712886b276433213f456e0579dc",
    "0x037ac7fa0039da18d9bda7fa946c684358be4b52",
    "0x037fd5b779c074e96f7fc77ceb453a0c6a5e8424",
    "0x038666d86f8c758842269915e2df6fa4ac39ec92",
    "0x0388cedb736843401805ebbd4038374f9a1eb923",
    "0x038ec7aab907a85bb35ac1ae036addc4c61b613a",
    "0x0394451c1238cec1e825229e692aa9e428c107d8",
    "0x0394a2d392564aba9db2f38c2d26c2fd34968247",
    "0x039a6c851766821990d8281173fcd429e3763886",
    "0x03a2654859528712895e534e31fbca4f4570e017",
    "0x03b0513bf1228756dd83647f758d4f34acf9328b",
    "0x03b9c58c6e1cf310225be71bee9e801f79ca3231",
    "0x03c08dd25b3ae478a05e0f02420fcd9a8cd8b9e3",
    "0x03cd6f145ba9b86566303205a63d3d251f2233cd",
    "0x03e140e4ed67f63f6e0f7862c27d09a33ced128e",
    "0x03e2c02d367a37c2865b3dc3f688eebe9fcce179",
    "0x03e5f840bc72173f89a6a53b04d81858a945cde2",
    "0x03ef2627e5cdd0b305c0aeb713a220e4239b421a",
    "0x03ff24ae9003dcb5bd4de6aa8a5a8a8808927024",
    "0x04029baca527b69247dbe9243dfc9b5d12c7ba60",
    "0x04097681e4305d1e6d9583968bbae6d9f1045acc",
    "0x04331bfe69b1f06bd47a179bcacf4c55ea9c31a8",
    "0x04364803306daafde794f870763c246d027d7a4f",
    "0x043fe80d62f41d59879291d45cb2d112c4ffdec9",
    "0x04443efdc00dfaf45adf2fc340c33bb04de02b06",
    "0x046bc269b6a21d8215e920dc636d28540fa19164",
    "0x0470a9e093b653dc7d5f2a1c13574c533080c759",
    "0x047718e3bfa4d9ca8d121e459752e30c2b5a1763",
    "0x0481d2c6702780312531f2bf123c53761907a3ac",
    "0x0483e1151126fdda3049ffb5827a6c038d7a4b12",
    "0x0486a26dc28771cd1a6a1281d6fc8b5aafe1dae0",
    "0x049ae3487543dcd0d3ce5329d713e3a8e6aa1f20",
    "0x049ffb82168abfcf203af1a96b1176a55ff2568b",
    "0x04aa28e442582a2498901696d746ce9d3f0ef69c",
    "0x04ac86355292df1ed5bf778ff9bb3b70d1614a72",
    "0x04ad6e3038765c4799cb7330cd6b641b76c7ab2a",
    "0x04ae5e14b4bb70f77c36adb00bbf6a368cc6b944",
    "0x04c36d1373b69177f311c2e27fea6ed61a3b84b1",
    "0x04c6f02a13a7b8465f7fecd52a215d64df7e54ad",
    "0x04d7c2ee4cdbac9a0fc46d3e35e79aba5cca471d",
    "0x04e91ce58a44c501704f5266345c0057a8407805",
    "0x04f53c463e2ef0371897dd54b45848d2c82219e5",
    "0x04f5df957ce0405ba0264eca6130161cfaa12571",
    "0x04f671ff7215eb5908ee1fb5e7a089152681aeb4",
    "0x04fa5c3869ded7d00f36f13597a2f46aee4c9220",
    "0x04fd71a7c80dee02cec42ca7c6941d0940cbf55f",
    "0x0503b4d6b8bb49d9275155f95f27646871ad1dc2",
    "0x0503e39c5ce7d746daae175e7342e6edc4ad1b07",
    "0x05087add640eecad416e66e6ddd97a0c085f96d8",
    "0x050a3bf4cc6898bddb35824a5a130a8c16f05000",
    "0x0514a89b8bac595e323603cc3c0a1cb765e99eb2",
    "0x0517473a5ddf4e34ea414c0296b3bf7f8e7a58cd",
    "0x0522f9c27660fa91976ce4f34287a44df00dff5a",
    "0x053dba7292957341779cb0e9aae1aa7b139ada3a",
    "0x054b198f53817caf7b4736bc8d4b449f6ba595f9",
    "0x055315baa7c47651f1380caffefd75fdded85607",
    "0x0563b837ba1831066a10f923deb91e8cc57608dd",
    "0x057ede2341433137c09a0fe9ec989b15fc8fd3ee",
    "0x05864a7448918e04b1f8f4d157fd8be09954b6c6",
    "0x0589e39b4308e244338d7574ec7d456a8a32d8a1",
    "0x05936f6a5ea9abfbfcc690f1a6140d97e80640f9",
    "0x05a6e8868f95aa2942c08d2f6ff3b3554dc4f39c",
    "0x05a9d39e168fd7aca02970be894aea848d85bd33",
    "0x05c250120ce07ba6fe361b39ac344148435c25ca",
    "0x05c2ac36ef6567d949d851a73292a51735ec37c6",
    "0x05c6050f35740f44688a60697e78494e4c5d11be",
    "0x05cba70566e3601008017d27680460aa87116c58",
    "0x05cda24eeefd1f24f18dac398f5a612674d3ca5e",
    "0x05ce5d83371872ca8d6c4319170b452898fda3f4",
    "0x05de7ddfc4eecda880e6099b616ad1edfe5f47ad",
    "0x0600c3ef3cf0d7a5b9d75d610ea9b3545eb37707",
    "0x060ae40af665c3b35c5d7ec749bd43a007ec0093",
    "0x06102c7cac12825208e0e61a681caac0686a452b",
    "0x0614560451f8a991a8f3ec6f2a7e4d63f60ce2b9",
    "0x0629ec429fcdf345e81451d110936012671a8e45",
    "0x062e2aaa9ec2da2340cc49c76be1604047ea0892",
    "0x0633a05a8e7ea9e60feeeea247abf600c7e62144",
    "0x06486e323d993af90d544bd28ecbb6ce24a70937",
    "0x06690058df0450b51722389385beae900cc293e3",
    "0x066d0ba423756b72cc0d78e5f15fbddb58a1851a",
    "0x067794f1837c0eb0321fe356921a51263ece3a3a",
    "0x0688b354dd975fdffdfa22a74b616a8947f290c1",
    "0x069b3278b5900687711f454bc7fb5e674058d9aa",
    "0x06a30395353d7d3742e49bf69fd25fdf69a131c8",
    "0x06a901b77ba5800421853f7b3113d573b704a6a6",
    "0x06b933af4d2b9b051f08411e06a7cb5b3fb1af62",
    "0x06c46997358761442ee5783bcac1eddc7ec059fa",
    "0x06c5b7dc5fc34a49065204f7a7e9bb46927d74f9",
    "0x06d0f03416fbc95a69bffa1374e597f8aef752d8",
    "0x06d37a3d0a912b93894c7b200eff45fab608a7d8",
    "0x06dcd010af968e601725fdc634c175c32267860d",
    "0x06e13bd0a3cba08e61028f2326b9ea2ca2539900",
    "0x06e44bddc59807e847b4b567546acc90ff3fe13e",
    "0x06edb0f99cac3a91ad03003dfc955fd9a9d4394d",
    "0x06ff4392500787bb3e67a53df8e09fd7e01db080",
    "0x07130fe9bf015fab3a34690a43bdeee5920dc9d5",
    "0x07268d7b3e591d2ed547840aeba16d4b70e77777",
    "0x072c807a5447d3aa990d33c06850baa4caef0f9a",
    "0x0732756638c99538e6d5e2df86bad1640b8a19bd",
    "0x0743882fa09a0c257b18d53dc1b101d3f32a04e5",
    "0x0745b7440d7d34596a17bb60963581e0e4cdc67e",
    "0x07557f6138ed55485d82d64eea175043e4f2bbb4",
    "0x0759e32943f66a586f40ecb8ebbab569707768bf",
    "0x0760f1c748e312c0d4b50770c20708a09a31d4e9",
    "0x07670dd0d0d00ed6ec47cd4073c7ad5ddda32405",
    "0x076d14b6d6174576e3d94b98c10e042eaf829907",
    "0x078472dc3e0618629660866b9197a3adea72291d",
    "0x079613b90349ab9d29b90337143741cb8681ff09",
    "0x07ce6b69220e9a075619426244858a5d58b70f8f",
    "0x07dbc9423bc7e4315fe6224996a1d6a93931cd55",
    "0x07ee1473cf79b5dcf20ae24cd6f2f26e9a454f33",
    "0x07f06853774a36f64634861b62f39a31ab6ba177",
    "0x07fd1a1a634c35fdbe6b1f44f002b31e7c4e10d9",
    "0x08074907281c467e0f447a583e328f3054ba3031",
    "0x0807634163c350d57e5f3b62e42c1668c4043dac",
    "0x0824270c2810b3585c69cc9985f9d84a7a1331d3",
    "0x0827f8b54c75e93288f226535943bc572cdbeb41",
    "0x082ea0d7bff5aa27baeff4b1b47f564579827fe2",
    "0x083fc10ce7e97cafbae0fe332a9c4384c5f54e45",
    "0x0845fc89c51b2bcd1c3b0db9dbca497d641ec7d3",
    "0x08463e0c47866478ac987c9c174db035f8842285",
    "0x0853cd91c34e2f9ceadfc12f2050087e0750a308",
    "0x08552b556cd22f54141b361e207619a49f28ffed",
    "0x088deab2efa1f1d78eac1f075c50056317bd77d5",
    "0x08a9ead5bd9af49a1f777a9f15929871abd684c3",
    "0x08aa0d6ececd535b031906584ecf6c2a250c71f2",
    "0x08c1ae7e46d4a13b766566033b5c47c735e19f6f",
    "0x08c340f86f96b63e5c8d8b28a9e1eee750d3cf7b",
    "0x08c904a02578ed95a46c25a8cc510cd6ed9f2ed3",
    "0x08d816526bdc9d077dd685bd9fa49f58a5ab8e48",
    "0x08dd1e75fe3a46c1e5e5ed555ff0d21466fb52e0",
    "0x08e286f12eb9503f828aba1703d462b4f399c8e0",
    "0x08e3ad15459f88fac76c302ed74d66067eff21fa",
    "0x08e810334c2e258d8ea1d4e52a1949c1a91d6785",
    "0x08f2e7153db8d222e4f448215e6bfbd7301a0d2f",
    "0x08f89d26025a432b30a093ed3996d7454170fb9f",
    "0x0908f9b79d168eed89623683e36e4c621f53aa44",
    "0x090aead23c1619debe43740111676ea50c3a0646",
    "0x090ce57968ce977162c29f017c8f779fee2b0609",
    "0x0914435327d37eff7bc58c4ca10e29362ee8eecb",
    "0x09194d925d5ba8edef1b769d5563904598de4adb",
    "0x0956e1057992f91c1b85d5da88cf92bb60e24a9e",
    "0x0959a5a5ddfc29244e35d6c5bcbf6b5b2f8e1a0c",
    "0x096316b9d1bcf27c0973b724f627e220bdf8c799",
    "0x098b064616830937017f2a865127b949126085a6",
    "0x098c35e5267532affd54e93890b51f472c9b5d7d",
    "0x09a85ebc43823b889a41b3f152b50357d83d62c5",
    "0x09be9ab0eb61327d26904bae69efdc6633d5eec8",
    "0x09c37423e85fc4b8fb236082e22082982be50efa",
    "0x09d1772d6de1eef5dc9c403e55f67af92395f7d2",
    "0x09dbc4a902199bbe7f7ec29b3714731786f2e878",
    "0x09e557999346e9ddf77c74ab449ff45370c69564",
    "0x09e98171c37a3b6bcc71e37318db10279364a3c0",
    "0x09eb34b84e7d33a37c61bdfad3e7902c5174dce9",
    "0x09f0f20c5becf62ddff44bdd14268173006f1c2a",
    "0x09fabf8c79e141fea3b87629a19c1defef0b9291",
    "0x09ff3e739a0f87d1a38b551659079cc6bdfbcf79",
    "0x09ffde888c773f789404a4da2118f6859623cddd",
    "0x0a067cfa2d1a6437f705a259af19b2c4ec8659d4",
    "0x0a091901dee7f4ea0463fcab4b846125bf6a9cd8",
    "0x0a0e6b2a03ccd2209309e26619fb29a308fbdc13",
    "0x0a10ee9232f36dd6ef0d039e091a175bb7fcad42",
    "0x0a125adae1c994855a5022eb6c11f3abfcf361bf",
    "0x0a26182f3a0ebe0e6105f184bb16333695039f56",
    "0x0a2a335b7420db3bada6a13e354d465a3d6de2a4",
    "0x0a2a620c7eaef99ebbac40d9e8e3fe196761e955",
    "0x0a43ca828eccad048744c47a9b74b71a7338af01",
    "0x0a4ac478efe450358483ae3e1491069153e96dbd",
    "0x0a5315d8521355e50119b679ab95dd7a4da21d59",
    "0x0a53ab509200a29a186c393a16ae1a79c6790d7f",
  ];

    // useEffect(() => {

    //   sam?.map((address) => {

    //     const allTx = web3.eth
    //       .getTransactionCount(address)
    //       .then(data);

    //     const beforeTx = web3.eth
    //       .getTransactionCount(address, lastOthersideBlock)
    //       .then(data);

    //     async function getTransactionCount() {
    //       const allTxs = await allTx;
    //       const beforeTxs = await beforeTx;

    //       if (allTxs - beforeTxs === 0) {
    //           setAddresses(addresses => [...addresses, address])
    //       }
    //     }

    //     getTransactionCount();
    //   })
    // },[])


  //   useEffect(() => {

  //     data?.ownerAddresses?.map((address) => {

  //         const addressTx = address.ownerAddress

  //       const allTx = web3.eth
  //         .getTransactionCount(addressTx)
  //         .then(data);

  //       const beforeTx = web3.eth
  //         .getTransactionCount(addressTx, lastOthersideBlock)
  //         .then(data);

  //       async function getTransactionCount() {
  //         const allTxs = await allTx;
  //         const beforeTxs = await beforeTx;

  //         if (allTxs - beforeTxs === 0) {
  //             setAddresses(addresses => [...addresses, addressTx])
  //         }
  //       }

  //       getTransactionCount();
  //     })

  //   }, [data]);

  console.log(addresses);

  //   if (isFetching) return "Loading...";

  return (
    <Content>
      {addresses?.map((address, i) => (
        <div key={i}>{address}</div>
      ))}
    </Content>
  );
};

export default InactiveWallets;

// 0x000000000000000000000000000000000000dead
// 0x00f29ed858a03fd32f892f6decda7ddbe412af44
// 0x0184670b561ce2a85c97b11b06116c2b0a044663
// 0x0dd46d3cab80d4eec9298fbae9cc6c27edd969c0
// 0x08e286f12eb9503f828aba1703d462b4f399c8e0
// 0x04e91ce58a44c501704f5266345c0057a8407805
// 0x0c391abb8ed8d0cee77fdf843110e1037b300d71
// 0x0d4e3433da92bb9d255f6c750889690e6b765563
// 0x0503e39c5ce7d746daae175e7342e6edc4ad1b07
// 0x0f732cd6a97330f7c5fb4f41199f1bf1229ed179
// 0x0fab8621b8c262cebec6b15fa45800e83799a2e8
// 0x1187bbc9f5dac8696650fbd6888e9e199f5c309a
// 0x151a8e3429d7cb08320c3ca738a6a6bd1838bee3
// 0x16164d9104d65401b093f59654745140a522a91a
// 0x19114036f58f6a465477261cf7309aa71b4e4022
// 0x1a79625d7bae59d84e2ef43cfa47885a65ba7ddc
// 0x1b21b115f4bbc82a6b671a8b81d6fe93c82215e8
// 0x067794f1837c0eb0321fe356921a51263ece3a3a
// 0x0e13236bfd4917d9465d54540dab19e66b9f6e3f
// 0x0b4530a70dc0bbf1ce346208e2f3f349dc773b63
// 0x0c883485abd73a8a6ed672c3b1f64261a63cda83
// 0x0eb3b031927e6833231159c9ed0fe47efd29842b
// 0x10ec4d4a8a9de35008e13645ba2b9de931aa5f78
// 0x1616b4c7cdb4093befbcca62f3198993327a8e9e
// 0x1974341df4b113a4c16f3d3f106176dec0e4da67
// 0x14b5943c1aa34ae75988cb1a0e6b9378f2320ad4
// 0x11b528e31d4fac05638c625fd79de34840363be9
// 0x12ec6a7952d62cb0d3336f6d00de26501c483718
// 0x05c6050f35740f44688a60697e78494e4c5d11be
// 0x0a9326888e9ecbcb444118970b37275fb69ce8a3
// 0x00d9711e2defb1b94dcffe6e962d5188f3ae9e52
// 0x114d24243a860162edc73c5a13b6216aca3ecb4c
// 0x16b6e57eda810c8c7ed8370a37104e10c0a93a47
// 0x16c4304868307af8c2002f74955243a431e083fe