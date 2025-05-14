import clsx from 'clsx';

import Layout from '@theme/Layout';
import styles from './style.module.css';

export default function Tool() {
  return (
    <Layout title="工具" description="工具">
      <div className={clsx("container", styles.customContainer)}>
        <h1>工具集合</h1>
        <div>
          {/* <a href="/tool/ai-generate-px-area.html">ai-generate-px-area.html</a><br /> */}
          {/* <a href="/tool/mp4转gif.html">mp4转gif.html</a><br /> */}
          <a href="/tool/notary-fee-calculator.html">河南省公证员收费计算器</a><br />
          <a href="/tool/number-system-conversion.html">进制转换器</a><br />
          <a href="/tool/english-word-listening-practice.html">英语单词听力练习</a>
        </div>
      </div>
    </Layout>
  );
}
