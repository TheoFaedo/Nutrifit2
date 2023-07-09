<?php

namespace Tests\Helpers;

use Tests\TestCase;
use App\Helpers\FormatHelper;

class FormatHelperTest extends TestCase
{
    public function testVerifyPseudo()
    {
        $this->assertTrue(FormatHelper::verify_pseudo('john_doe'));
        $this->assertFalse(FormatHelper::verify_pseudo('john_doe!'));
        $this->assertFalse(FormatHelper::verify_pseudo('j'));
        $this->assertFalse(FormatHelper::verify_pseudo('johndoejohndoejohndoejohndoe')); // Exceeds maximum length of 20
    }

    public function testVerifyMail()
    {
        $this->assertTrue(FormatHelper::verify_mail('john.doe@example.com'));
        $this->assertFalse(FormatHelper::verify_mail('john.doe@example'));
        $this->assertFalse(FormatHelper::verify_mail('john.doe@'));
        $this->assertFalse(FormatHelper::verify_mail('john.doe@example.com!'));
    }

    public function testVerifyPassword()
    {
        $this->assertTrue(FormatHelper::verify_password('MyPassword123'));
        $this->assertFalse(FormatHelper::verify_password('MyPasswordé'));
        $this->assertFalse(FormatHelper::verify_password(' '));
    }

    public function testVerifyGender()
    {
        $this->assertTrue(FormatHelper::verify_gender('M'));
        $this->assertTrue(FormatHelper::verify_gender('W'));
        $this->assertFalse(FormatHelper::verify_gender('A'));
    }

    public function testVerifyGoal()
    {
        $this->assertTrue(FormatHelper::verify_goal('1'));
        $this->assertTrue(FormatHelper::verify_goal('2'));
        $this->assertTrue(FormatHelper::verify_goal('3'));
        $this->assertFalse(FormatHelper::verify_goal('4'));
    }
}