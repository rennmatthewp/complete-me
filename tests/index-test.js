import { expect } from 'chai';
import index from '../lib/index'
import { bubbleSort, insertionSort, mergeSort, quickSort } from '@rennmatthewp/sorting-suite';

describe('Example Test File', () => {
  it('should use imported sorts', () => {
    expect(bubbleSort([3,2,1])).to.deep.equal([1,2,3]);
  })
})
