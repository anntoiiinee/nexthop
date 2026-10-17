// Composants disponibles dans tous les MDX sans import (passés à <Content components={mdxComponents} />).
import Term from '@/components/Term.astro';
import Callout from '@/components/Callout.astro';
import CliOutput from '@/components/CliOutput.astro';
import Lab from '@/components/Lab.astro';
import CodeFile from '@/components/CodeFile.astro';
import Topology from '@/components/diagrams/Topology.astro';
import PacketFormat from '@/components/diagrams/PacketFormat.astro';
import Bits from '@/components/diagrams/Bits.astro';
import AddressSpace from '@/components/diagrams/AddressSpace.astro';
import OsiModel from '@/components/diagrams/OsiModel.astro';
import Sequence from '@/components/diagrams/Sequence.astro';
import GitGraph from '@/components/diagrams/GitGraph.astro';

export const mdxComponents = { Term, Callout, CliOutput, Lab, CodeFile, Topology, PacketFormat, Bits, AddressSpace, OsiModel, Sequence, GitGraph };
