import React, { useMemo } from 'react'
import { Container, Header } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Atlas } from '../../Atlas'
import { Title } from '../Title'
import { Owner } from '../Owner'
import { Props } from './EstateDetail.types'
import { Badge } from '../Badge'
import { Description } from '../Description'
import { Order } from '../Order'
import './EstateDetail.css'

const EstateDetail = (props: Props) => {
  const { nft } = props

  const selection = useMemo(
    () =>
      nft.estate!.parcels.map(pair => ({
        x: +pair.x,
        y: +pair.y
      })),
    [nft]
  )
  const xs = [...new Set(selection.map(coords => coords.x).sort())]
  const ys = [...new Set(selection.map(coords => coords.y).sort())]
  const x = xs[(xs.length / 2) | 0]
  const y = ys[(ys.length / 2) | 0]

  return (
    <>
      <div style={{ height: 420 }}>
        <Atlas x={x} y={y} isDraggable selection={selection} />
      </div>
      <Container>
        <Title
          left={
            <>
              <Header size="large">{nft.name || t('detail.estate')}</Header>
              <Badge color="#37333d">
                {nft.estate!.size.toLocaleString()} LAND
              </Badge>
            </>
          }
          right={<Owner nft={nft} />}
        />
        <Description text={nft.estate!.data?.description} />
        <Order nft={nft} />
      </Container>
    </>
  )
}

export default React.memo(EstateDetail)