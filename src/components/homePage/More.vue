<template>
  <div class="more" :class="{moreBox:show}">
    <div class="check-more" @click="showContent">
      <div>一个</div>
      <div>VOL.2274</div>
      <div :class="{active:show}"></div>
    </div>
    <div class="hidden-content">
      <div v-for="(el,index) in dataHome" :key="index">
        <div class="others" :class="{hidden:el.id==='2310'}" @click="toDetailPage(el.id,index)">
          <div class="arrow">&nbsp;>&nbsp;</div>
          <div class="other-title">{{el.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'More',
    props: ['dataHome', 'showMore', 'allData', 'nameMap'],
    data() {
      return {
        show: false
      }
    },
    methods: {
      showContent() {
        this.show = !this.show
        this.$emit('update:showMore', !this.showMore)
      },
      toDetailPage(id, num) {
        let detail = this.allData.categoryAll[num].detail.find((item) => (item.id === id))
        let detailAll = this.allData.categoryAll[num]
        this.$emit('update:showNav', false)
        this.$router.push({
          name: this.nameMap[num],
          params: {
            id: detail.id,
            detail: detail,
            detailAll: detailAll
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .more {
    width: 100%;
    height: 40px;
    border-bottom: 5px solid #efefef;
    transition: all 1s;
    overflow: hidden;
    &.moreBox {
      padding-bottom: 20px;
      height: auto;
    }
    .check-more {
      display: flex;
      width: 35%;
      height: 40px;
      margin: 0 auto;
      & > div {
        flex: 1;
        line-height: 40px;
        font-size: 13px;
        text-align: center;
        color: #333;
        &:last-child {
          background: url("../../assets/img/show-content.png") no-repeat center;
          &.active {
            background: url("../../assets/img/hidden-content.png") no-repeat center;
          }
        }
      }
    }
    .hidden-content {
      .others {
        padding: 0 20px;
        line-height: 50px;
        width: 100%;
        box-sizing: border-box;
        height: 50px;
        display: flex;
        font-size: 16px;
        color: #333;
        &.hidden {
          display: none;
        }
        .arrow {
          width: 40px;
          text-align: left;
        }
        .other-title {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
