// data.js
window.PROBLEM_DATA = {
    title: "两数之和 (Two Sum)",
    language: "python",
    descriptionHTML: `
        <p>给定一个整数数组 <code>nums</code> 和一个整数目标值 <code>target</code>，请你在该数组中找出 <strong>和为目标值</strong> <code>target</code> 的那 <strong>两个</strong> 整数，并返回它们的数组下标。</p>
        <p>你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。</p>
        <p><strong>示例:</strong></p>
        <pre style="background: #2b2b2b; padding: 10px; border-radius: 4px;"><code>输入：nums = [2,7,11,15], target = 9
输出：[0,1]</code></pre>
    `,
    initialCode: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # 在此处编写你的代码
        pass`,
    expectedCode: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        hash_map = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in hash_map:
                return [hash_map[complement], i]
            hash_map[num] = i
        return []`
};
