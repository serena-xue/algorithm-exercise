window.PROBLEM_DATA = {
    "two-sum": {
        title: "两数之和 (Two Sum)",
        language: "python",
        descriptionHTML: `
            <p>给定一个整数数组 <code>nums</code> 和一个整数目标值 <code>target</code>，请你在该数组中找出 <strong>和为目标值</strong> <code>target</code> 的那 <strong>两个</strong> 整数，并返回它们的数组下标。</p>
            <p><strong>示例:</strong></p>
            <pre style="background: #2b2b2b; padding: 10px; border-radius: 4px;"><code>输入：nums = [2,7,11,15], target = 9
输出：[0,1]</code></pre>
        `,
        initialCode: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        pass`,
        expectedCode: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        hash_map = {}\n        for i, num in enumerate(nums):\n            complement = target - num\n            if complement in hash_map:\n                return [hash_map[complement], i]\n            hash_map[num] = i\n        return []`
    },
    "valid-parentheses": {
        title: "有效的括号 (Valid Parentheses)",
        language: "python",
        descriptionHTML: `
            <p>给定一个只包括 <code>'('</code>，<code>')'</code>，<code>'{'</code>，<code>'}'</code>，<code>'['</code>，<code>']'</code> 的字符串 <code>s</code> ，判断字符串是否有效。</p>
        `,
        initialCode: `class Solution:\n    def isValid(self, s: str) -> bool:\n        pass`,
        expectedCode: `class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {")": "(", "}": "{", "]": "["}\n        for char in s:\n            if char in mapping:\n                top_element = stack.pop() if stack else '#'\n                if mapping[char] != top_element:\n                    return False\n            else:\n                stack.append(char)\n        return not stack`
    }
};
